#!/usr/bin/env python3
"""Emit the sacred-geometry CartersCare mark.

Construction (equal circles only):
- Outer and inner edges are concentric circles.
- Each colour is a vesica piscis (intersection of two equal circles)
  whose tips point along a radius, so the annulus clips the points off
  and leaves a lens of that colour.
- Where two vesicas overlap, the lens is the connection colour.
"""
import math
from pathlib import Path

BLUE, MAGENTA, GOLD, GREEN = "#22ABE0", "#B01A8A", "#FEBC02", "#83BD42"
PURPLE, OLIVE = "#682B7F", "#6EA828"
INK = {"blue": BLUE, "magenta": MAGENTA, "gold": GOLD, "green": GREEN}
BLEND = {
    frozenset(("blue", "magenta")): PURPLE,
    frozenset(("magenta", "gold")): PURPLE,
    frozenset(("gold", "green")): OLIVE,
    frozenset(("blue", "gold")): "#E09A14",
    frozenset(("magenta", "green")): "#5C8430",
    frozenset(("blue", "green")): "#2A9A78",
}

# Locked after visual passes. 0° = east, CCW. Opening faces east.
RM, R, D = 75.0, 104.0, 44.0
RO, RI = 108.0, 46.0
ANGLES = ((84, "blue"), (158, "magenta"), (222, "gold"), (300, "green"))


def vesica_d(c1, c2, r, n=64):
    x1, y1 = c1
    x2, y2 = c2
    dist = math.hypot(x2 - x1, y2 - y1)
    alpha = math.acos(max(-1.0, min(1.0, (dist / 2) / r)))
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


def vesica_oriented(tip_deg):
    a = math.radians(tip_deg + 90)
    ux, uy = math.cos(a), -math.sin(a)
    mid_a = math.radians(tip_deg)
    mx, my = RM * math.cos(mid_a), -RM * math.sin(mid_a)
    c1 = (mx + ux * D / 2, my + uy * D / 2)
    c2 = (mx - ux * D / 2, my - uy * D / 2)
    return vesica_d(c1, c2, R)


def mark_inner(gid="cc"):
    ring = (
        f"M {RO:.2f},0 A {RO:.2f},{RO:.2f} 0 1 1 {-RO:.2f},0 "
        f"A {RO:.2f},{RO:.2f} 0 1 1 {RO:.2f},0 Z "
        f"M {RI:.2f},0 A {RI:.2f},{RI:.2f} 0 1 0 {-RI:.2f},0 "
        f"A {RI:.2f},{RI:.2f} 0 1 0 {RI:.2f},0 Z"
    )
    parts = [
        f'<clipPath id="{gid}"><path fill-rule="evenodd" d="{ring}"/></clipPath>',
        f'<g clip-path="url(#{gid})">',
    ]
    ves = []
    for ang, name in ANGLES:
        d = vesica_oriented(ang)
        ves.append((name, d))
        parts.append(f'<path d="{d}" fill="{INK[name]}"/>')
    for i, (n1, d1) in enumerate(ves):
        for j, (n2, d2) in enumerate(ves[i + 1 :], start=i + 1):
            fill = BLEND[frozenset((n1, n2))]
            parts.append(
                f'<clipPath id="{gid}p{i}{j}"><path d="{d1}"/></clipPath>'
                f'<path d="{d2}" fill="{fill}" clip-path="url(#{gid}p{i}{j})"/>'
            )
    parts.append("</g>")
    return "\n".join(parts)


def standalone():
    pad = 4
    x = -RO - pad
    s = (RO + pad) * 2
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x:.0f} {x:.0f} {s:.0f} {s:.0f}" role="img" aria-label="CartersCare">
{mark_inner("cc")}
</svg>
'''


def favicon():
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="CartersCare">
  <rect width="64" height="64" rx="14" fill="#FCF9F5"/>
  <svg x="5" y="5" width="54" height="54" viewBox="{-RO-4:.0f} {-RO-4:.0f} {(RO+4)*2:.0f} {(RO+4)*2:.0f}">
{mark_inner("fav")}
  </svg>
</svg>
'''


def main():
    Path("/workspace/.grok/mark-sacred.svg").write_text(standalone())
    html = f'''<!doctype html><meta charset="utf-8">
<style>
  html,body {{ margin:0; background:#E4D9CE; }}
  .row {{ display:flex; gap:28px; align-items:end; padding:28px; }}
  .card {{ background:#FCF9F5; border-radius:28px; padding:28px; }}
  img {{ display:block; }}
</style>
<div class="row">
  <div class="card"><img src="mark-sacred.svg" width="280" height="280"></div>
  <div class="card" style="border-radius:22px;padding:18px"><img src="mark-sacred.svg" width="96" height="96"></div>
  <div class="card" style="border-radius:16px;padding:10px"><img src="mark-sacred.svg" width="48" height="48"></div>
  <div class="card" style="border-radius:10px;padding:6px"><img src="mark-sacred.svg" width="24" height="24"></div>
  <div class="card" style="background:#2D1636;border-radius:22px;padding:18px"><img src="mark-sacred.svg" width="96" height="96"></div>
</div>
'''
    Path("/workspace/.grok/sacred-preview.html").write_text(html)
    print("emitted")


if __name__ == "__main__":
    main()
