#!/usr/bin/env python3
"""Replace BA sources with warmer, bare-skin, mixed-tone close-ups."""
from __future__ import annotations

import io
import ssl
import urllib.request
from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SRC_DIR = ROOT / "images" / "ba-source"
BA_OPT = ROOT / "images" / "opt" / "ba"
BA_DIR = ROOT / "images" / "ba"

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/124.0.0.0 Safari/537.36"
CTX = ssl.create_default_context()

# Curated Unsplash close-ups: warm light, skin-forward, mixed tones, 2+ Asian-reading
SOURCES = [
    # Thai/Asian-reading woman, soft warm studio
    ("https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1600&h=2000&q=88", (0.18, 0.12, 0.82, 0.70)),
    # East Asian woman natural
    ("https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1600&h=2000&q=88", (0.22, 0.14, 0.78, 0.68)),
    # Warm olive / Mediterranean cheek focus
    ("https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1600&h=2000&q=88", (0.20, 0.16, 0.80, 0.72)),
    # Deeper skin, warm light
    ("https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1600&h=2000&q=88", (0.24, 0.18, 0.76, 0.70)),
    # Fair skin freckle texture, warm
    ("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&h=2000&q=88", (0.22, 0.16, 0.78, 0.68)),
    # Soft Southeast Asian beauty, natural
    ("https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=1600&h=2000&q=88", (0.20, 0.14, 0.80, 0.70)),
]


def fetch(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, context=CTX, timeout=60) as res:
        return res.read()


def skin_crop(img: Image.Image, box) -> Image.Image:
    w, h = img.size
    l, t, r, b = box
    cropped = img.crop((int(w * l), int(h * t), int(w * r), int(h * b)))
    return ImageOps.fit(cropped, (800, 1000), method=Image.Resampling.LANCZOS, centering=(0.5, 0.42))


def make_after(img: Image.Image) -> Image.Image:
    out = img.convert("RGB")
    out = ImageEnhance.Brightness(out).enhance(1.05)
    out = ImageEnhance.Contrast(out).enhance(1.1)
    out = ImageEnhance.Color(out).enhance(1.05)
    r, g, b = out.split()
    r = ImageEnhance.Brightness(r).enhance(1.04)
    b = ImageEnhance.Brightness(b).enhance(0.96)
    out = Image.merge("RGB", (r, g, b))
    return out.filter(ImageFilter.UnsharpMask(radius=1.1, percent=130, threshold=2))


def make_before(img: Image.Image) -> Image.Image:
    out = img.convert("RGB")
    out = ImageEnhance.Brightness(out).enhance(0.92)
    out = ImageEnhance.Color(out).enhance(0.85)
    out = ImageEnhance.Contrast(out).enhance(0.93)
    r, g, b = out.split()
    r = ImageEnhance.Brightness(r).enhance(1.07)
    g = ImageEnhance.Brightness(g).enhance(0.97)
    b = ImageEnhance.Brightness(b).enhance(0.95)
    out = Image.merge("RGB", (r, g, b))
    noise = Image.effect_noise(out.size, 14).convert("L")
    noise = ImageEnhance.Brightness(noise).enhance(0.5)
    textured = Image.blend(out, Image.merge("RGB", (noise, noise, noise)), 0.1)
    return textured.filter(ImageFilter.GaussianBlur(radius=0.4))


def save_jpg(img: Image.Image, path: Path, quality: int = 82) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    clean = Image.new("RGB", img.size)
    clean.paste(img.convert("RGB"))
    clean.save(path, "JPEG", quality=quality, optimize=True, progressive=True)


def main() -> None:
    SRC_DIR.mkdir(parents=True, exist_ok=True)
    for i, (url, crop) in enumerate(SOURCES, start=1):
        raw = SRC_DIR / f"source-{i}.jpg"
        print("fetch", i)
        raw.write_bytes(fetch(url))
        img = Image.open(io.BytesIO(raw.read_bytes())).convert("RGB")
        base = skin_crop(img, crop)
        after = make_after(base)
        before = make_before(base)
        save_jpg(after, BA_OPT / f"skin{i}-after.jpg", 80)
        save_jpg(before, BA_OPT / f"skin{i}-before.jpg", 80)
        save_jpg(after, BA_DIR / f"skin{i}-after.jpg", 86)
        save_jpg(before, BA_DIR / f"skin{i}-before.jpg", 86)
        print("ok", i)


if __name__ == "__main__":
    main()
