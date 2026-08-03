#!/usr/bin/env python3
"""Re-fetch Anuphan with discrete weight files (Thai + latin)."""
from __future__ import annotations

import re
import ssl
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FONTS = ROOT / "fonts"
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/124.0.0.0 Safari/537.36"
CTX = ssl.create_default_context()

WEIGHTS = [300, 400, 500, 600]


def fetch(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, context=CTX, timeout=60) as res:
        return res.read()


def main() -> None:
    blocks = []
    file_i = 1
    for w in WEIGHTS:
        css_url = (
            f"https://fonts.googleapis.com/css2?family=Anuphan:wght@{w}&display=swap"
        )
        css = fetch(css_url).decode("utf-8")
        # Keep only thai + latin faces for this weight
        for m in re.finditer(r"/\*([^*]+)\*/\s*(@font-face\s*\{[^}]+\})", css):
            label = m.group(1).strip().lower()
            if label not in ("thai", "latin", "latin-ext"):
                continue
            face = m.group(2)
            url = re.search(r"url\((https://[^)]+\.woff2)\)", face).group(1)
            fname = f"anuphan-w{w}-{label.replace('-', '')}-{file_i}.woff2"
            file_i += 1
            dest = FONTS / fname
            data = fetch(url)
            dest.write_bytes(data)
            face = face.replace(url, fname)
            blocks.append(f"/* {label} */\n{face}")
            print(w, label, fname, len(data))

    # Read current fonts.css and replace Anuphan faces
    css_path = FONTS / "fonts.css"
    full = css_path.read_text(encoding="utf-8")
    # Drop old Anuphan faces
    full = re.sub(
        r"/\*[^*]*\*/\s*@font-face\s*\{[^}]*font-family:\s*'Anuphan'[^}]*\}\s*",
        "",
        full,
        flags=re.S,
    )
    full = "\n".join(blocks) + "\n\n" + full.lstrip()
    css_path.write_text(full, encoding="utf-8")
    print("patched fonts.css")


if __name__ == "__main__":
    main()
