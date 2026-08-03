#!/usr/bin/env python3
"""Build a clean self-hosted fonts.css for Cormorant, Manrope, Anuphan."""
from __future__ import annotations

import hashlib
import re
import ssl
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FONTS = ROOT / "fonts"
UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
)
CTX = ssl.create_default_context()

QUERIES = [
    ("cormorant", "Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600"),
    ("manrope", "Manrope:wght@400;500;600"),
    ("anuphan", "Anuphan:wght@300;400;500;600"),
]

KEEP = {
    "cormorant": {"latin", "latin-ext"},
    "manrope": {"latin", "latin-ext"},
    "anuphan": {"thai", "latin", "latin-ext"},
}


def fetch(url: str) -> bytes:
    req = urllib.request.Request(
        url,
        headers={"User-Agent": UA, "Accept": "text/css,*/*;q=0.1"},
    )
    with urllib.request.urlopen(req, context=CTX, timeout=60) as res:
        return res.read()


def main() -> None:
    FONTS.mkdir(parents=True, exist_ok=True)
    for p in FONTS.glob("*.woff2"):
        name = p.name.lower()
        if name.startswith(("cormorant", "manrope", "anuphan", "fraunces", "prompt")):
            p.unlink()

    out_blocks = []
    url_to_file = {}
    n = 0
    for family_key, q in QUERIES:
        css = fetch(f"https://fonts.googleapis.com/css2?family={q}&display=swap").decode("utf-8")
        keep = KEEP[family_key]
        for m in re.finditer(r"/\*\s*([^*]+?)\s*\*/\s*(@font-face\s*\{.*?\})", css, re.S):
            label = m.group(1).strip().lower()
            if label not in keep:
                continue
            face = m.group(2)
            url_m = re.search(r"url\((https://[^)]+\.woff2)\)", face)
            if not url_m:
                continue
            url = url_m.group(1)
            if url not in url_to_file:
                n += 1
                fname = f"{family_key}-{n}.woff2"
                data = fetch(url)
                (FONTS / fname).write_bytes(data)
                url_to_file[url] = fname
                print(family_key, label, fname, len(data), hashlib.md5(data).hexdigest()[:8])
            else:
                fname = url_to_file[url]
            face = face.replace(url, fname)
            out_blocks.append(f"/* {label} */\n{face}")

    (FONTS / "fonts.css").write_text("\n\n".join(out_blocks) + "\n", encoding="utf-8")
    print("wrote", len(out_blocks), "faces from", len(url_to_file), "files")


if __name__ == "__main__":
    main()
