#!/usr/bin/env python3
"""Polish the vesica C. Large candidates + favicon sizes."""
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


def vesica_d(c1, c2, r, n=40):
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
    a = math.radians(tip_deg + 90)
    ux, uy = math.cos(a), -math.sin(a)
    c1 = (mid[0] + ux * D / 2, mid[1] + uy * D / 2)
    c2 = (mid[0] - ux * D / 2, mid[1] - uy * D / 2)
    return vesica_d(c1, c2, R)


def mark(cx, cy, Rm, R, D, angles, ro, ri, gid):
    ring = (
        f"M {cx+ro:.2f},{cy:.2f} A {ro:.2f},{ro:.2f} 0 1 1 {cx-ro:.2f},{cy:.2f} "
        f"A {ro:.2f},{ro:.2f} 0 1 1 {cx+ro:.2f},{cy:.2f} Z "
        f"M {cx+ri:.2f},{cy:.2f} A {ri:.2f},{ri:.2f} 0 1 0 {cx-ri:.2f},{cy:.2f} "
        f"A {ri:.2f},{ri:.2f} 0 1 0 {cx+ri:.2f},{cy:.2f} Z"
    )
    parts = [f'<clipPath id="{gid}"><path fill-rule="evenodd" d="{ring}"/></clipPath>', f'<g clip-path="url(#{gid})">']
    ves = []
    for ang, name in angles:
        d = vesica_oriented(polar(cx, cy, Rm, ang), ang, R, D)
        ves.append((name, d))
        parts.append(f'<path d="{d}" fill="{INK[name]}"/>')
    # pairwise lenses
    for i, (n1, d1) in enumerate(ves):
        for j, (n2, d2) in enumerate(ves[i + 1 :], start=i + 1):
            parts.append(
                f'<clipPath id="{gid}p{i}{j}"><path d="{d1}"/></clipPath>'
                f'<path d="{d2}" fill="{BLEND[frozenset((n1, n2))]}" clip-path="url(#{gid}p{i}{j})"/>'
            )
    parts.append("</g>")
    return "\n".join(parts)


def main():
    # angles: blue, magenta, gold, green
    sets = [
        ("1", 72, 100, 36, 108, 46, [(78, "blue"), (162, "magenta"), (228, "gold"), (300, "green")]),
        ("2", 74, 96, 62, 104, 44, [(82, "blue"), (160, "magenta"), (226, "gold"), (304, "green")]),
        ("3", 70, 90, 74, 100, 42, [(88, "blue"), (164, "magenta"), (230, "gold"), (298, "green")]),
        ("4", 76, 108, 48, 110, 40, [(74, "blue"), (156, "magenta"), (220, "gold"), (308, "green")]),
        ("5", 73, 100, 55, 106, 48, [(90, "blue"), (165, "magenta"), (232, "gold"), (296, "green")]),
        ("6", 78, 92, 68, 102, 40, [(70, "blue"), (150, "magenta"), (215, "gold"), (312, "green")]),
    ]
    cells = []
    for i, (name, Rm, R, D, ro, ri, angles) in enumerate(sets):
        body = mark(160, 150, Rm, R, D, angles, ro, ri, f"m{i}")
        cells.append(
            f'<g transform="translate({20 + (i % 3) * 420},{20 + (i // 3) * 360})">'
            f'<rect width="400" height="340" rx="18" fill="{CREAM}"/>'
            f"{body}"
            f'<text x="16" y="324" font-family="Nunito,sans-serif" font-size="16" fill="#6E5A73">'
            f"{name}  Rm{Rm} R{R} D{D} ro{ro} ri{ri}</text></g>"
        )
    # small-size row of set 2 and 5 and 3
    small = []
    for k, idx in enumerate((1, 2, 4)):
        name, Rm, R, D, ro, ri, angles = sets[idx]
        # scale the whole mark into a 64 tile and a 28 tile
        body = mark(0, 0, Rm, R, D, angles, ro, ri, f"s{k}")
        small.append(
            f'<g transform="translate({20 + k * 220},760)">'
            f'<rect width="200" height="120" rx="14" fill="{CREAM}"/>'
            f'<g transform="translate(28,18) scale({56/220})">'
            f'<g transform="translate(-50,-40)">{body}</g></g>'
            f'<g transform="translate(120,36) scale({28/220})">'
            f'<g transform="translate(-50,-40)">{body}</g></g>'
            f'<text x="12" y="110" font-family="Nunito,sans-serif" font-size="13" fill="#6E5A73">{name} at 56 / 28</text>'
            f"</g>"
        )
    W, H = 1280, 900
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">
<rect width="{W}" height="{H}" fill="#E4D9CE"/>
{''.join(cells)}
{''.join(small)}
</svg>'''
    Path("/workspace/.grok/sacred-preview.html").write_text(
        f'<!doctype html><meta charset="utf-8"><style>html,body{{margin:0;background:#E4D9CE}}</style>{svg}'
    )
    print("ok")


if __name__ == "__main__":
    main()
