#!/usr/bin/env python3
"""Contact sheet of sacred-geometry connected-C marks. Not shipped."""
import math
from pathlib import Path

BLUE = "#22ABE0"
MAGENTA = "#B01A8A"
GOLD = "#FEBC02"
GREEN = "#83BD42"
PURPLE = "#682B7F"
OLIVE = "#6EA828"
PLUM = "#5C2E78"
TEAL = "#1E8A96"
CREAM = "#FCF9F5"

BLEND = {
    frozenset(("blue", "magenta")): PURPLE,
    frozenset(("magenta", "gold")): PLUM,
    frozenset(("gold", "green")): OLIVE,
    frozenset(("blue", "green")): TEAL,
    frozenset(("magenta", "green")): "#4E7A32",
    frozenset(("blue", "gold")): "#D4921A",
}
INK = {"blue": BLUE, "magenta": MAGENTA, "gold": GOLD, "green": GREEN}


def polar(cx, cy, r, deg):
    a = math.radians(deg)
    return (cx + r * math.cos(a), cy - r * math.sin(a))


def vesica_d(c1, c2, r, n=32):
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
            t = -alpha + 2 * alpha * i / n
            ang = direction + t
            pts.append((cx + r * math.cos(ang), cy - r * math.sin(ang)))
        return pts

    pts = arc(x1, y1, dir12) + arc(x2, y2, dir21)[1:]
    return "M " + " L ".join(f"{x:.2f},{y:.2f}" for x, y in pts) + " Z"


def color_for(deg):
    d = deg % 360
    # 0 is east. CCW: blue across the top, magenta down the left,
    # gold lower-left, green along the bottom to the lower terminal.
    if 20 <= d < 125:
        return "blue"
    if 125 <= d < 205:
        return "magenta"
    if 205 <= d < 255:
        return "gold"
    return "green"


def layout(n, gap, S, R, cx, cy):
    """n equal circles on a ring. Visual opening `gap` degrees centered on east.
    S is ring radius, R circle radius. Returns centers, angles, alpha.
    """
    alpha = math.degrees(math.asin(min(1.0, R / S)))
    sweep = 360 - gap - 2 * alpha
    if sweep <= 10:
        return None
    phi = sweep / (n - 1)
    start = gap / 2 + alpha
    circles = []
    for i in range(n):
        ang = start + i * phi
        circles.append((polar(cx, cy, S, ang), ang))
    return circles, phi, alpha, start


def svg_mark(circles, R, clip=None, gid="m"):
    """circles: list of ((x,y), colorname). clip: (cx,cy,ro,ri) or None."""
    parts = []
    if clip:
        cx, cy, ro, ri = clip
        # evenodd ring
        ring = (
            f"M {cx+ro:.2f},{cy:.2f} A {ro:.2f},{ro:.2f} 0 1 1 {cx-ro:.2f},{cy:.2f} "
            f"A {ro:.2f},{ro:.2f} 0 1 1 {cx+ro:.2f},{cy:.2f} Z "
            f"M {cx+ri:.2f},{cy:.2f} A {ri:.2f},{ri:.2f} 0 1 0 {cx-ri:.2f},{cy:.2f} "
            f"A {ri:.2f},{ri:.2f} 0 1 0 {cx+ri:.2f},{cy:.2f} Z"
        )
        parts.append(f'<clipPath id="{gid}"><path fill-rule="evenodd" d="{ring}"/></clipPath>')
        parts.append(f'<g clip-path="url(#{gid})">')
    for (x, y), name in circles:
        parts.append(f'<circle cx="{x:.2f}" cy="{y:.2f}" r="{R:.2f}" fill="{INK[name]}"/>')
    # heterochrome vesicas, nearest pairs only (avoid distant accidental overlaps)
    for i, (c1, n1) in enumerate(circles):
        for c2, n2 in circles[i + 1 :]:
            if n1 == n2:
                continue
            D = math.hypot(c1[0] - c2[0], c1[1] - c2[1])
            if D >= 2 * R or D < R * 0.35:
                continue
            # only relatively near neighbors — skip pairs that only nick
            if D > 1.85 * R:
                continue
            d = vesica_d(c1, c2, R)
            if not d:
                continue
            fill = BLEND.get(frozenset((n1, n2)), PURPLE)
            parts.append(f'<path d="{d}" fill="{fill}"/>')
    if clip:
        parts.append("</g>")
    return "\n".join(parts)


def cell(title, body, ox, oy, w=280, h=300):
    return (
        f'<g transform="translate({ox},{oy})">'
        f'<rect width="{w}" height="{h}" rx="18" fill="{CREAM}"/>'
        f"{body}"
        f'<text x="{w/2}" y="{h-12}" text-anchor="middle" font-family="Nunito,sans-serif" '
        f'font-size="13" fill="#6E5A73">{title}</text></g>'
    )


def main():
    cells = []
    # (n, gap, S/R, clip?)
    specs = [
        (6, 78, 1.55, False, "6 natural"),
        (6, 78, 1.55, True, "6 smooth"),
        (7, 72, 1.70, False, "7 natural"),
        (7, 72, 1.70, True, "7 smooth"),
        (5, 86, 1.35, False, "5 bubbles"),
        (5, 86, 1.35, True, "5 smooth"),
        (8, 68, 1.95, False, "8 gentle"),
        (8, 68, 1.95, True, "8 smooth"),
        (4, 96, 1.22, False, "4 lobes"),
        (4, 96, 1.22, True, "4 smooth"),
        (6, 84, 1.42, False, "6 tighter"),
        (7, 80, 1.48, False, "7 tighter"),
    ]
    for i, (n, gap, s_ratio, do_clip, title) in enumerate(specs):
        R = 46
        S = s_ratio * R
        cx, cy = 140, 132
        laid = layout(n, gap, S, R, cx, cy)
        if not laid:
            continue
        circs, phi, alpha, start = laid
        colored = [(p, color_for(a)) for p, a in circs]
        D = 2 * S * math.sin(math.radians(phi / 2))
        hole = S - R
        outer = S + R
        clip = None
        if do_clip:
            # shave scallops: outer at the mid-chord envelope, inner just outside the peaks
            ro = S + R * 0.78
            ri = max(8, S - R * 0.55)
            clip = (cx, cy, ro, ri)
        body = svg_mark(colored, R, clip, gid=f"c{i}")
        note = f"{title}  D/R {D/R:.2f} hole {hole/outer:.2f}"
        col, row = i % 4, i // 4
        cells.append(cell(note, body, 16 + col * 296, 16 + row * 316))

    W, H = 16 + 4 * 296 + 16, 16 + 3 * 316 + 16
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">
<rect width="{W}" height="{H}" fill="#EFE7DE"/>
{''.join(cells)}
</svg>'''
    Path("/workspace/.grok/sacred-sheet.svg").write_text(svg)
    html = f"""<!doctype html><meta charset="utf-8"><title>sacred</title>
<style>html,body{{margin:0;background:#EFE7DE}}</style>
{svg}"""
    Path("/workspace/.grok/sacred-preview.html").write_text(html)
    print("wrote", W, H)


if __name__ == "__main__":
    main()
