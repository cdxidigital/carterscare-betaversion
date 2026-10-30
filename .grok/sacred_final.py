#!/usr/bin/env python3
"""Finalists, true favicon sizes, beside the brand crop."""
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


def polar(r, deg):
    a = math.radians(deg)
    return (r * math.cos(a), -r * math.sin(a))


def vesica_d(c1, c2, r, n=48):
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


def mark_svg(Rm, R, D, angles, ro, ri, gid, n=48):
    ring = (
        f"M {ro:.2f},0 A {ro:.2f},{ro:.2f} 0 1 1 {-ro:.2f},0 "
        f"A {ro:.2f},{ro:.2f} 0 1 1 {ro:.2f},0 Z "
        f"M {ri:.2f},0 A {ri:.2f},{ri:.2f} 0 1 0 {-ri:.2f},0 "
        f"A {ri:.2f},{ri:.2f} 0 1 0 {ri:.2f},0 Z"
    )
    parts = [
        f'<clipPath id="{gid}"><path fill-rule="evenodd" d="{ring}"/></clipPath>',
        f'<g clip-path="url(#{gid})">',
    ]
    ves = []
    for ang, name in angles:
        d = vesica_oriented(polar(Rm, ang), ang, R, D)
        ves.append((name, d))
        parts.append(f'<path d="{d}" fill="{INK[name]}"/>')
    for i, (n1, d1) in enumerate(ves):
        for j, (n2, d2) in enumerate(ves[i + 1 :], start=i + 1):
            parts.append(
                f'<clipPath id="{gid}p{i}{j}"><path d="{d1}"/></clipPath>'
                f'<path d="{d2}" fill="{BLEND[frozenset((n1, n2))]}" clip-path="url(#{gid}p{i}{j})"/>'
            )
    parts.append("</g>")
    return "\n".join(parts)


FINALS = {
    "S": dict(Rm=75, R=104, D=44, ro=108, ri=46,
              angles=[(84, "blue"), (158, "magenta"), (222, "gold"), (300, "green")]),
    "T": dict(Rm=76, R=108, D=48, ro=110, ri=42,
              angles=[(76, "blue"), (156, "magenta"), (218, "gold"), (306, "green")]),
    "U": dict(Rm=74, R=100, D=52, ro=104, ri=44,
              angles=[(88, "blue"), (162, "magenta"), (226, "gold"), (298, "green")]),
}


def tile(key, spec, size, ox, oy, label):
    gid = f"{key}{size}{ox}"
    body = mark_svg(spec["Rm"], spec["R"], spec["D"], spec["angles"], spec["ro"], spec["ri"], gid)
    pad = spec["ro"] + 8
    sc = size / (2 * pad)
    return (
        f'<g transform="translate({ox},{oy})">'
        f'<rect width="{size+80}" height="{size+36}" rx="12" fill="{CREAM}"/>'
        f'<g transform="translate({size/2+8},{size/2+6}) scale({sc})">{body}</g>'
        f'<text x="8" y="{size+28}" font-family="Nunito,sans-serif" font-size="13" fill="#6E5A73">{label}</text>'
        f"</g>"
    )


def main():
    parts = []
    # large
    for i, key in enumerate(("S", "T", "U")):
        spec = FINALS[key]
        body = mark_svg(**{k: spec[k] for k in ("Rm", "R", "D", "angles", "ro", "ri")}, gid=f"L{key}")
        parts.append(
            f'<g transform="translate({30 + i * 380},30)">'
            f'<rect width="350" height="340" rx="18" fill="{CREAM}"/>'
            f'<g transform="translate(175,160) scale(1.15)">{body}</g>'
            f'<text x="16" y="328" font-family="Nunito,sans-serif" font-size="16" fill="#2D1636">{key}</text>'
            f"</g>"
        )
    # favicon-like tiles
    x = 30
    y = 400
    for key in ("S", "T", "U"):
        for size, radius in ((64, 14), (32, 7), (16, 4)):
            spec = FINALS[key]
            gid = f"f{key}{size}"
            body = mark_svg(spec["Rm"], spec["R"], spec["D"], spec["angles"], spec["ro"], spec["ri"], gid)
            pad = spec["ro"]
            sc = (size * 0.78) / (2 * pad)
            parts.append(
                f'<g transform="translate({x},{y})">'
                f'<rect width="{size}" height="{size}" rx="{radius}" fill="{CREAM}" stroke="#E8DFD6"/>'
                f'<g transform="translate({size/2},{size/2}) scale({sc})">{body}</g>'
                f"</g>"
            )
            x += size + 14
        x += 28
    # brand crop for reference
    parts.append(
        f'<g transform="translate(30,500)">'
        f'<image href="file:///workspace/.grok/board-mark-crop.png" width="180" height="250"/>'
        f'<text x="0" y="268" font-family="Nunito,sans-serif" font-size="14" fill="#2D1636">board</text>'
        f"</g>"
    )
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
<rect width="1200" height="800" fill="#E4D9CE"/>
{''.join(parts)}
</svg>'''
    Path("/workspace/.grok/sacred-preview.html").write_text(
        f'<!doctype html><meta charset="utf-8"><style>html,body{{margin:0;background:#E4D9CE}}</style>{svg}'
    )
    # also emit standalone SVGs for each finalist
    for key, spec in FINALS.items():
        ro = spec["ro"]
        body = mark_svg(spec["Rm"], spec["R"], spec["D"], spec["angles"], spec["ro"], spec["ri"], "mark")
        stand = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="{-ro} {-ro} {ro*2} {ro*2}" role="img" aria-label="CartersCare">
{body}
</svg>'''
        Path(f"/workspace/.grok/final-{key}.svg").write_text(stand)
    print("ok")


if __name__ == "__main__":
    main()
