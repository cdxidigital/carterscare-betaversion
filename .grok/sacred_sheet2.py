#!/usr/bin/env python3
"""Second pass: four-arm sacred C, closer to the brand board."""
import math
from pathlib import Path

BLUE, MAGENTA, GOLD, GREEN = "#22ABE0", "#B01A8A", "#FEBC02", "#83BD42"
PURPLE, OLIVE, PLUM = "#682B7F", "#6EA828", "#7A3478"
CREAM = "#FCF9F5"
INK = {"blue": BLUE, "magenta": MAGENTA, "gold": GOLD, "green": GREEN}
BLEND = {
    frozenset(("blue", "magenta")): PURPLE,
    frozenset(("magenta", "gold")): PLUM,
    frozenset(("gold", "green")): OLIVE,
    frozenset(("blue", "gold")): "#E0A020",
    frozenset(("magenta", "green")): "#5A8A30",
    frozenset(("blue", "green")): "#2A9A78",
}


def polar(cx, cy, r, deg):
    a = math.radians(deg)
    return (cx + r * math.cos(a), cy - r * math.sin(a))


def vesica_d(c1, c2, r, n=36):
    x1, y1 = c1
    x2, y2 = c2
    D = math.hypot(x2 - x1, y2 - y1)
    if D >= 2 * r - 1e-6 or D < 1e-3:
        return None
    alpha = math.acos(max(-1.0, min(1.0, (D / 2) / r)))
    dir12 = math.atan2(-(y2 - y1), x2 - x1)
    dir21 = math.atan2(-(y1 - y2), x1 - x2)

    def arc(cx, cy, direction):
        pts = []
        for i in range(n + 1):
            t = -alpha + (2 * alpha) * i / n
            ang = direction + t
            pts.append((cx + r * math.cos(ang), cy - r * math.sin(ang)))
        return pts

    pts = arc(x1, y1, dir12) + arc(x2, y2, dir21)[1:]
    return "M " + " L ".join(f"{x:.2f},{y:.2f}" for x, y in pts) + " Z"


def vesica_oriented(mid, tip_deg, R, D):
    """Vesica whose pointy axis points along tip_deg (CCW from east)."""
    # line of centers is perpendicular to the tips
    a = math.radians(tip_deg + 90)
    ux, uy = math.cos(a), -math.sin(a)  # y-down
    c1 = (mid[0] + ux * D / 2, mid[1] + uy * D / 2)
    c2 = (mid[0] - ux * D / 2, mid[1] - uy * D / 2)
    return c1, c2, vesica_d(c1, c2, R)


def draw_circles(circles, r, blends=True):
    """circles: [(x,y,name)]"""
    out = []
    for x, y, name in circles:
        out.append(f'<circle cx="{x:.2f}" cy="{y:.2f}" r="{r:.2f}" fill="{INK[name]}"/>')
    if blends:
        for i, (x1, y1, n1) in enumerate(circles):
            for x2, y2, n2 in circles[i + 1 :]:
                if n1 == n2:
                    continue
                D = math.hypot(x1 - x2, y1 - y2)
                if D >= 2 * r or D < 0.2 * r:
                    continue
                d = vesica_d((x1, y1), (x2, y2), r)
                if d:
                    out.append(f'<path d="{d}" fill="{BLEND[frozenset((n1, n2))]}"/>')
    return "\n".join(out)


def ring_clip(gid, cx, cy, ro, ri):
    ring = (
        f"M {cx+ro:.2f},{cy:.2f} A {ro:.2f},{ro:.2f} 0 1 1 {cx-ro:.2f},{cy:.2f} "
        f"A {ro:.2f},{ro:.2f} 0 1 1 {cx+ro:.2f},{cy:.2f} Z "
        f"M {cx+ri:.2f},{cy:.2f} A {ri:.2f},{ri:.2f} 0 1 0 {cx-ri:.2f},{cy:.2f} "
        f"A {ri:.2f},{ri:.2f} 0 1 0 {cx+ri:.2f},{cy:.2f} Z"
    )
    return (
        f'<clipPath id="{gid}"><path fill-rule="evenodd" d="{ring}"/></clipPath>'
        f'<g clip-path="url(#{gid})">'
    )


def cell(title, body, ox, oy, w, h):
    return (
        f'<g transform="translate({ox},{oy})">'
        f'<rect width="{w}" height="{h}" rx="16" fill="{CREAM}"/>'
        f"{body}"
        f'<text x="12" y="{h-10}" font-family="Nunito,sans-serif" font-size="14" fill="#6E5A73">{title}</text>'
        f"</g>"
    )


def four_vesica_band(cx, cy, Rm, R, D, angles, ro, ri, gid, clip=True):
    """Four radial-tip vesicas (tips point in/out) clipped to an annulus."""
    parts = []
    if clip:
        parts.append(ring_clip(gid, cx, cy, ro, ri))
    vesicas = []
    for ang, name in angles:
        mid = polar(cx, cy, Rm, ang)
        # tips point radially: tip_deg = ang
        c1, c2, d = vesica_oriented(mid, ang, R, D)
        vesicas.append((name, d, c1, c2))
        parts.append(f'<path d="{d}" fill="{INK[name]}"/>')
    # overlaps: clip one vesica path by the other via clipPath of the path
    for i, (n1, d1, _, _) in enumerate(vesicas):
        for n2, d2, _, _ in vesicas[i + 1 :]:
            if n1 == n2 or not d1 or not d2:
                continue
            parts.append(
                f'<clipPath id="{gid}{n1}{n2}"><path d="{d1}"/></clipPath>'
                f'<path d="{d2}" fill="{BLEND[frozenset((n1, n2))]}" clip-path="url(#{gid}{n1}{n2})"/>'
            )
    if clip:
        parts.append("</g>")
    return "\n".join(parts)


def arm_circles(cx, cy, S, r, groups):
    """groups: list of (name, start_deg, end_deg, count) along the ring, inclusive ends."""
    circles = []
    for name, a0, a1, count in groups:
        if count == 1:
            angs = [(a0 + a1) / 2]
        else:
            angs = [a0 + (a1 - a0) * i / (count - 1) for i in range(count)]
        for a in angs:
            x, y = polar(cx, cy, S, a)
            circles.append((x, y, name))
    return circles


def main():
    cells = []
    W, H = 1480, 980
    # --- A. 4 vesicas, radial tips, clipped annulus (hero candidates)
    specs = [
        (78, 96, 58, [(72, "blue"), (158, "magenta"), (222, "gold"), (308, "green")], 104, 40, "A vesica R96 D58"),
        (76, 110, 50, [(70, "blue"), (155, "magenta"), (218, "gold"), (305, "green")], 108, 38, "B vesica R110 D50"),
        (74, 88, 70, [(75, "blue"), (160, "magenta"), (225, "gold"), (310, "green")], 102, 42, "C classic-ish D70"),
        (80, 120, 40, [(68, "blue"), (150, "magenta"), (215, "gold"), (302, "green")], 112, 36, "D fat vesica D40"),
    ]
    for i, (Rm, R, D, angles, ro, ri, title) in enumerate(specs):
        body = four_vesica_band(150, 145, Rm, R, D, angles, ro, ri, f"a{i}", clip=True)
        cells.append(cell(title, body, 16 + (i % 4) * 360, 16, 344, 300))

    # unclipped versions of A and D, shifted into the cell
    for i, (Rm, R, D, angles, ro, ri, title) in enumerate([specs[0], specs[3]]):
        body = four_vesica_band(150, 150, Rm, R, D, angles, ro, ri, f"u{i}", clip=False)
        cells.append(cell("raw " + title, body, 16 + i * 360, 332, 344, 310))

    # --- E. arm chains: tight within color, slightly wider at joints, then clipped
    groups = [
        ("blue", 38, 112, 3),
        ("magenta", 140, 196, 3),
        ("gold", 214, 248, 2),
        ("green", 270, 332, 3),
    ]
    cx, cy, S, r = 150, 150, 78, 52
    circles = arm_circles(cx, cy, S, r, groups)
    body = ring_clip("e", cx, cy, 108, 40) + draw_circles(circles, r) + "</g>"
    cells.append(cell("E arms clipped", body, 16 + 2 * 360, 332, 344, 310))

    circles2 = arm_circles(cx, cy, 82, 58, groups)
    body = draw_circles(circles2, 58)
    cells.append(cell("F arms natural", body, 16 + 3 * 360, 332, 344, 310))

    # --- G. one circle per color, big, natural — the simplest seed
    big = []
    for ang, name, rads in (
        (62, "blue", 74),
        (155, "magenta", 74),
        (222, "gold", 62),
        (305, "green", 74),
    ):
        # variable radius breaks equal-circle rule; keep equal below
        pass
    R = 70
    S = 64
    big = []
    for ang, name in ((58, "blue"), (150, "magenta"), (218, "gold"), (312, "green")):
        x, y = polar(160, 155, S, ang)
        big.append((x, y, name))
    body = draw_circles(big, R)
    cells.append(cell("G four equal circles", body, 16, 658, 344, 300))

    # H. four circles clipped to annulus
    body = ring_clip("h", 160, 155, 108, 42) + draw_circles(big, R) + "</g>"
    cells.append(cell("H four circles clipped", body, 16 + 360, 658, 344, 300))

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">
<rect width="{W}" height="{H}" fill="#EFE7DE"/>
{''.join(cells)}
</svg>'''
    Path("/workspace/.grok/sacred-sheet2.svg").write_text(svg)
    Path("/workspace/.grok/sacred-preview.html").write_text(
        f'<!doctype html><meta charset="utf-8"><style>html,body{{margin:0;background:#EFE7DE}}</style>{svg}'
    )
    print("ok", W, H)


if __name__ == "__main__":
    main()
