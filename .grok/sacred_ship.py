#!/usr/bin/env python3
"""Refined lobed vesica C — the one to ship if it holds at 24px."""
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


def vesica_d(c1, c2, r, n=56):
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


def mark(Rm, R, D, angles, ro, ri, gid):
    ring = (
        f"M {ro:.2f},0 A {ro:.2f},{ro:.2f} 0 1 1 {-ro:.2f},0 A {ro:.2f},{ro:.2f} 0 1 1 {ro:.2f},0 Z "
        f"M {ri:.2f},0 A {ri:.2f},{ri:.2f} 0 1 0 {-ri:.2f},0 A {ri:.2f},{ri:.2f} 0 1 0 {ri:.2f},0 Z"
    )
    parts = [
        f'<clipPath id="{gid}"><path fill-rule="evenodd" d="{ring}"/></clipPath>',
        f'<g clip-path="url(#{gid})">',
    ]
    ves = []
    for ang, name in angles:
        vd = vesica_oriented(polar(Rm, ang), ang, R, D)
        ves.append((name, vd))
        parts.append(f'<path d="{vd}" fill="{INK[name]}"/>')
    for i, (n1, d1) in enumerate(ves):
        for j, (n2, d2) in enumerate(ves[i + 1 :], start=i + 1):
            parts.append(
                f'<clipPath id="{gid}p{i}{j}"><path d="{d1}"/></clipPath>'
                f'<path d="{d2}" fill="{BLEND[frozenset((n1, n2))]}" clip-path="url(#{gid}p{i}{j})"/>'
            )
    parts.append("</g>")
    return "\n".join(parts)


SETS = {
    "loose": dict(Rm=78, R=92, D=68, ro=128, ri=42,
                  angles=[(78, "blue"), (156, "magenta"), (214, "gold"), (300, "green")]),
    "open": dict(Rm=76, R=94, D=64, ro=124, ri=46,
                 angles=[(92, "blue"), (164, "magenta"), (222, "gold"), (292, "green")]),
    "brand": dict(Rm=80, R=96, D=62, ro=126, ri=44,
                  angles=[(62, "blue"), (148, "magenta"), (210, "gold"), (318, "green")]),
    "soft": dict(Rm=82, R=100, D=58, ro=130, ri=48,
                 angles=[(70, "blue"), (152, "magenta"), (216, "gold"), (308, "green")]),
}


def main():
    parts = []
    for i, (name, spec) in enumerate(SETS.items()):
        body = mark(gid=f"L{i}", **spec)
        parts.append(
            f'<g transform="translate({16 + (i % 4) * 300},16)">'
            f'<rect width="284" height="300" rx="16" fill="{CREAM}"/>'
            f'<g transform="translate(142,140) scale(0.95)">{body}</g>'
            f'<text x="12" y="284" font-family="Nunito,sans-serif" font-size="15" fill="#2D1636">{name}</text>'
            f"</g>"
        )
        # 72 and 28 tiles
        for s, rx in ((72, 16), (28, 6)):
            sc = (s * 0.82) / (2 * spec["ro"])
            gid = f"s{i}{s}"
            body = mark(gid=gid, **spec)
            parts.append(
                f'<g transform="translate({16 + i * 300 + (0 if s == 72 else 90)},340)">'
                f'<rect width="{s}" height="{s}" rx="{rx}" fill="{CREAM}" stroke="#E8DFD6"/>'
                f'<g transform="translate({s/2},{s/2}) scale({sc})">{body}</g>'
                f"</g>"
            )
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1220" height="460" viewBox="0 0 1220 460">
<rect width="1220" height="460" fill="#E4D9CE"/>
{''.join(parts)}
</svg>'''
    Path("/workspace/.grok/sacred-preview.html").write_text(
        f"<!doctype html><meta charset=utf-8><style>html,body{{margin:0}}</style>{svg}"
    )
    print("ok")


if __name__ == "__main__":
    main()
