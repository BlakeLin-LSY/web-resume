#!/usr/bin/env python3
"""Package only selected public resume assets; never traverse source workspaces."""
import hashlib
import io
import json
from pathlib import Path
import zipfile

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "app/public"
NAMES = [
    "resume-overview.html",
    "projects/study-atlas.html",
    "projects/transcribe-for-x.html",
    "projects/windowphase.html",
    "resume/blake-lin-cv-en.pdf",
    "resume/blake-lin-cv-zh-tw.pdf",
]


def main():
    assets = json.loads((ROOT / "content/resume-assets.json").read_text())
    # Assemble and validate everything before replacing a good package.
    contents = {name: (PUBLIC / name).read_bytes() for name in NAMES}
    for locale in ("en", "zh-TW"):
        asset = assets["locales"][locale]
        data = contents["resume/" + asset["file"]]
        if not data.startswith(b"%PDF-") or len(data) != asset["bytes"] or hashlib.sha256(data).hexdigest() != asset["sha256"]:
            raise ValueError(f"Canonical CV mismatch: {locale}")
    for name, data in contents.items():
        if name.endswith(".html") and not data.lower().startswith(b"<!doctype html>"):
            raise ValueError(f"Incomplete HTML: {name}")
    overview = contents["resume-overview.html"].decode("utf-8")
    if overview.count('<html lang="en">') != 1:
        raise ValueError("Expected one complete overview document")
    # This is a generated package variant; the canonical renderer remains unchanged.
    overview = overview.replace('<html lang="en">', '<html lang="en" data-offline-package="true">', 1)
    contents["resume-overview.html"] = overview.encode("utf-8")
    manifest = {
        "schemaVersion": 1,
        "scope": "Complete local reading package: bilingual overview, three cases and two CVs. External email/LinkedIn destinations need connectivity.",
        "cvProvenance": assets["sourceVersion"],
        "files": [{"file": name, "bytes": len(data), "sha256": hashlib.sha256(data).hexdigest()} for name, data in contents.items()],
    }
    contents["manifest.json"] = (json.dumps(manifest, ensure_ascii=False, indent=2) + "\n").encode()
    contents["READ-ME.txt"] = (
        "Blake Lin — AI Software Engineer\n\n"
        "解壓縮後，保留資料夾結構並開啟 resume-overview.html。\n"
        "概要、三份作品介紹、兩份單頁 CV 均可離線閱讀；HTML 提供 English／正體中文與深淺色控制。\n"
        "Email／LinkedIn 需連線；Study Atlas 展示是保存的歷史案例，不呼叫 live 模型。\n"
        "6.0→4.6 是 calculated TALK budget，不是真人閱讀速度或 wall-clock 加速。\n\n"
        "Extract the archive, keep its folders, and open resume-overview.html.\n"
        "The overview, three cases and two one-page CVs are available offline.\n"
        "HTML pages include English/Traditional Chinese and light/dark reading controls.\n"
        "Email and LinkedIn need connectivity. The Atlas walkthrough is a preserved historical case, with no live model call.\n"
        "6.0→4.6 is calculated TALK budget, not human reading speed or wall-clock acceleration.\n\n"
        "manifest.json records the exact packaged bytes. Archive timestamps are normalized for repeatable builds.\n"
    ).encode("utf-8")
    buffer = io.BytesIO()
    with zipfile.ZipFile(buffer, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        for name, data in contents.items():
            info = zipfile.ZipInfo(name, (1980, 1, 1, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = 0o644 << 16
            archive.writestr(info, data)
    payload = buffer.getvalue()
    with zipfile.ZipFile(io.BytesIO(payload)) as archive:
        if archive.testzip() is not None or set(archive.namelist()) != set(contents):
            raise ValueError("Package integrity check failed")
    destination = PUBLIC / "blake-lin-application-preview.zip"
    staging = destination.with_suffix(".zip.tmp")
    staging.write_bytes(payload)
    staging.replace(destination)
    print(f"Generated complete offline reading package: {len(contents)} files, {len(payload)} bytes")


if __name__ == "__main__":
    main()
