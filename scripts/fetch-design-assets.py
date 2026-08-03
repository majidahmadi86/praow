#!/usr/bin/env python3
"""Download self-hosted fonts + build true same-person before/after pairs."""
from __future__ import annotations

import io
import os
import re
import ssl
import urllib.request
from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter, ImageOps

ROOT = Path(__file__).resolve().parents[1]
FONTS = ROOT / "fonts"
BA_SRC = ROOT / "images" / "ba"
BA_OPT = ROOT / "images" / "opt" / "ba"
SRC_DIR = ROOT / "images" / "ba-source"

UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
)
CTX = ssl.create_default_context()

FONT_CSS = (
    "https://fonts.googleapis.com/css2?"
    "family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&"
    "family=Manrope:wght@400;500;600&"
    "family=Anuphan:wght@300;400;500;600&"
    "display=swap"
)

# Close-up skin / face portraits (Unsplash). Cropped to cheek-jaw-forehead.
# At least two read Asian for Bangkok market.
SOURCES = [
    # East Asian woman, warm light, natural
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1600&h=2000&q=88",
    # East Asian beauty portrait
    "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1600&h=2000&q=88",
    # Warm olive skin, natural close face
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1600&h=2000&q=88",
    # Deeper skin tone portrait
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=1600&h=2000&q=88",
    # Fair natural skin, soft light
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&h=2000&q=88",
    # Soft freckled / textured skin
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1600&h=2000&q=88",
]

# Crop boxes as fractions (left, top, right, bottom) aiming cheek/jaw/forehead
CROPS = [
    (0.22, 0.18, 0.78, 0.72),  # cheek + eye area
    (0.20, 0.22, 0.80, 0.78),  # mid face
    (0.18, 0.20, 0.82, 0.75),  # jaw-cheek
    (0.22, 0.16, 0.78, 0.70),  # forehead-cheek
    (0.24, 0.20, 0.76, 0.74),  # cheek close
    (0.20, 0.24, 0.80, 0.80),  # lower cheek / jaw
]


def fetch(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, context=CTX, timeout=60) as res:
        return res.read()


def fetch_fonts() -> None:
    FONTS.mkdir(parents=True, exist_ok=True)
    css = fetch(FONT_CSS).decode("utf-8", "replace")
    urls = sorted(set(re.findall(r"url\((https://[^)]+\.woff2)\)", css)))
    if not urls:
        raise SystemExit("No woff2 URLs found in Google Fonts CSS")

    mapping = {}
    idx = 1
    rewritten = css
    for url in urls:
        family = "font"
        if "cormorant" in url.lower() or "Cormorant" in css[max(0, css.find(url) - 200) : css.find(url)]:
            family = "cormorant"
        # parse from surrounding block
        block_start = css.rfind("@font-face", 0, css.find(url))
        block = css[block_start : css.find("}", css.find(url)) + 1]
        if "Cormorant" in block:
            family = "cormorant"
        elif "Manrope" in block:
            family = "manrope"
        elif "Anuphan" in block:
            family = "anuphan"
        fname = f"{family}-{idx}.woff2"
        idx += 1
        dest = FONTS / fname
        if not dest.exists() or dest.stat().st_size < 1000:
            print("font", fname)
            dest.write_bytes(fetch(url))
        mapping[url] = fname
        rewritten = rewritten.replace(url, fname)

    # Clean google fonts css for local use
    rewritten = re.sub(r"/\*[^*]*\*/", lambda m: m.group(0), rewritten)
    # Keep comments that label subsets; rewrite src urls already done
    (FONTS / "fonts.css").write_text(rewritten, encoding="utf-8")
    print("Wrote fonts/fonts.css with", len(mapping), "faces")


def skin_crop(img: Image.Image, box) -> Image.Image:
    w, h = img.size
    l, t, r, b = box
    cropped = img.crop((int(w * l), int(h * t), int(w * r), int(h * b)))
    # Normalize to 4:5 portrait
    return ImageOps.fit(cropped, (800, 1000), method=Image.Resampling.LANCZOS, centering=(0.5, 0.4))


def make_after(img: Image.Image) -> Image.Image:
    out = img.convert("RGB")
    out = ImageEnhance.Brightness(out).enhance(1.05)
    out = ImageEnhance.Contrast(out).enhance(1.08)
    out = ImageEnhance.Color(out).enhance(1.06)
    # warmth
    r, g, b = out.split()
    r = ImageEnhance.Brightness(r).enhance(1.03)
    b = ImageEnhance.Brightness(b).enhance(0.97)
    out = Image.merge("RGB", (r, g, b))
    out = out.filter(ImageFilter.UnsharpMask(radius=1.2, percent=120, threshold=3))
    return out


def make_before(img: Image.Image) -> Image.Image:
    """Treated/dull variant from the SAME source portrait."""
    out = img.convert("RGB")
    out = ImageEnhance.Brightness(out).enhance(0.92)
    out = ImageEnhance.Color(out).enhance(0.85)
    out = ImageEnhance.Contrast(out).enhance(0.94)
    # slight red-shift (uneven tone)
    r, g, b = out.split()
    r = ImageEnhance.Brightness(r).enhance(1.06)
    g = ImageEnhance.Brightness(g).enhance(0.98)
    b = ImageEnhance.Brightness(b).enhance(0.96)
    out = Image.merge("RGB", (r, g, b))
    # subtle texture / pore emphasis
    noise = Image.effect_noise(out.size, 12).convert("L")
    noise = ImageEnhance.Brightness(noise).enhance(0.55)
    textured = Image.blend(out, Image.merge("RGB", (noise, noise, noise)), 0.08)
    textured = textured.filter(ImageFilter.GaussianBlur(radius=0.35))
    return textured


def save_jpg(img: Image.Image, path: Path, quality: int = 82) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    # Strip EXIF by re-encoding from pixels only
    clean = Image.new("RGB", img.size)
    clean.paste(img)
    clean.save(path, "JPEG", quality=quality, optimize=True, progressive=True)


def build_ba_pairs() -> None:
    SRC_DIR.mkdir(parents=True, exist_ok=True)
    BA_SRC.mkdir(parents=True, exist_ok=True)
    BA_OPT.mkdir(parents=True, exist_ok=True)

    for i, url in enumerate(SOURCES, start=1):
        raw_path = SRC_DIR / f"source-{i}.jpg"
        if not raw_path.exists() or raw_path.stat().st_size < 1000:
            print("download source", i)
            raw_path.write_bytes(fetch(url))
        img = Image.open(io.BytesIO(raw_path.read_bytes())).convert("RGB")
        crop = skin_crop(img, CROPS[i - 1])
        after = make_after(crop)
        before = make_before(crop)
        # Save full + opt (same size here; opt slightly smaller quality)
        save_jpg(after, BA_SRC / f"skin{i}-after.jpg", 88)
        save_jpg(before, BA_SRC / f"skin{i}-before.jpg", 88)
        save_jpg(after, BA_OPT / f"skin{i}-after.jpg", 80)
        save_jpg(before, BA_OPT / f"skin{i}-before.jpg", 80)
        # Also mirror into images/ba for non-opt references
        save_jpg(after, BA_SRC.parent / "ba" / f"skin{i}-after.jpg", 86)
        save_jpg(before, BA_SRC.parent / "ba" / f"skin{i}-before.jpg", 86)
        print("pair", i, "ok")


if __name__ == "__main__":
    fetch_fonts()
    build_ba_pairs()
    print("done")
