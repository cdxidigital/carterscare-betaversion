#!/usr/bin/env python3
"""Overlay equal-circle constructions on the brand crop."""
import math
from PIL import Image, ImageDraw

src = Image.open("/workspace/.grok/board-mark-crop.png").convert("RGBA")
W, H = src.size

# All circles share one radius. Positions are hand-fit to the crop (230x320).
PRESETS = {
    "A": (38, [
        (118, 118, "b"), (176, 112, "b"),
        (46, 118, "m"), (40, 178, "m"),
        (58, 236, "y"),
        (112, 258, "g"), (174, 246, "g"),
    ]),
    "B": (42, [
        (124, 122, "b"), (184, 116, "b"),
        (48, 108, "m"), (42, 172, "m"),
        (64, 230, "y"),
        (118, 262, "g"), (180, 250, "g"),
    ]),
    "C": (46, [
        (130, 124, "b"), (186, 120, "b"),
        (52, 112, "m"), (46, 176, "m"),
        (70, 236, "y"),
        (124, 266, "g"), (184, 252, "g"),
    ]),
    "D": (36, [
        (108, 116, "b"), (158, 108, "b"), (196, 118, "b"),
        (42, 104, "m"), (36, 156, "m"), (40, 208, "m"),
        (72, 248, "y"),
        (120, 268, "g"), (168, 262, "g"), (206, 246, "g"),
    ]),
}

COLORS = {
    "b": (34, 171, 224, 150),
    "m": (176, 26, 138, 150),
    "y": (254, 188, 2, 160),
    "g": (131, 189, 66, 150),
}

sheet = Image.new("RGBA", (W * 2 + 24, H * 2 + 24), (228, 217, 206, 255))
keys = list(PRESETS)
for i, key in enumerate(keys):
    r, circles = PRESETS[key]
    im = src.copy()
    overlay = Image.new("RGBA", im.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    for x, y, name in circles:
        d.ellipse((x - r, y - r, x + r, y + r), outline=COLORS[name][:3] + (255,), width=2)
        d.ellipse((x - r, y - r, x + r, y + r), fill=COLORS[name])
    im = Image.alpha_composite(im, overlay)
    # label
    ImageDraw.Draw(im).text((6, 6), key, fill=(45, 22, 54, 255))
    col, row = i % 2, i // 2
    sheet.paste(im, (8 + col * (W + 8), 8 + row * (H + 8)))

sheet.convert("RGB").save("/workspace/screenshots/sacred-overlay.jpg", quality=86)
print("saved", sheet.size)
