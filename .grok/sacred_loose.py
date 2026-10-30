#!/usr/bin/env python3
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


def mark(Rm, R, D, angles, ro, ri, gid, outer=True, inner=True):
    clips = []
    if outer:
        clips.append(
            f"M {ro:.2f},0 A {ro:.2f},{ro:.2f} 0 1 1 {-ro:.2f},0 A {ro:.2f},{ro:.2f} 0 1 1 {ro:.2f},0 Z"
        )
    if inner:
        # punch
        clips.append(
            f"M {ri:.2f},0 A {ri:.2f},{ri:.2f} 0 1 0 {-ri:.2f},0 A {ri:.2f},{ri:.2f} 0 1 0 {ri:.2f},0 Z"
        )
    parts = []
    if clips:
        d = " ".join(clips)
        parts.append(f'<clipPath id="{gid}"><path fill-rule="evenodd" d="{d}"/></clipPath>')
        parts.append(f'<g clip-path="url(#{gid})">')
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
    if clips:
        parts.append("</g>")
    return "\n".join(parts)


ANGLES = [(78, "blue"), (156, "magenta"), (214, "gold"), (300, "green")]
# wider mouth
ANGLES2 = [(96, "blue"), (168, "magenta"), (226, "gold"), (286, "green")]

specs = [
    ("tight", dict(Rm=78, R=92, D=68, angles=ANGLES, ro=102, ri=40, outer=True)),
    ("loose", dict(Rm=78, R=92, D=68, angles=ANGLES, ro=128, ri=42, outer=True)),
    ("hole only", dict(Rm=78, R=92, D=68, angles=ANGLES, ro=140, ri=44, outer=False)),
    ("wide mouth", dict(Rm=76, R=96, D=60, angles=ANGLES2, ro=120, ri=40, outer=True)),
    ("wide hole", dict(Rm=74, R=100, D=56, angles=ANGLES2, ro=150, ri=48, outer=False)),
    ("plump wide", dict(Rm=80, R=110, D=48, angles=ANGLES2, ro=132, ri=46, outer=True)),
]

parts = []
for i, (name, kw) in enumerate(specs):
    body = mark(gid=f"g{i}", **kw)
    col, row = i % 3, i // 3
    parts.append(
        f'<g transform="translate({20+col*400},{20+row*380})">'
        f'<rect width="380" height="360" rx="16" fill="{CREAM}"/>'
        f'<g transform="translate(190,170) scale(1.05)">{body}</g>'
        f'<text x="14" y="344" font-family="Nunito,sans-serif" font-size="16" fill="#2D1636">{name}</text>'
        f"</g>"
    )

svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1220" height="780" viewBox="0 0 1220 780">
<rect width="1220" height="780" fill="#E4D9CE"/>
{''.join(parts)}
</svg>'''
Path("/workspace/.grok/sacred-preview.html").write_text(
    f'<!doctype html><meta charset="utf-8"><style>html,body{{margin:0}}</style>{svg}'
)
print("ok")
