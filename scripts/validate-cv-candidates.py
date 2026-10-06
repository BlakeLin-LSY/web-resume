#!/usr/bin/env python3
"""Producer content checks for local CV candidates; no source writes."""
import hashlib
import json
import re
import unicodedata
from pathlib import Path
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parent.parent
profile = json.loads((ROOT / 'content/resume-profile.json').read_text())
provenance = json.loads((ROOT / 'review/cv-candidates/provenance.json').read_text())


def normalize(text):
    return re.sub(r'\s+', '', unicodedata.normalize('NFKC', text))


def inspect_text(text):
    normalized = normalize(text)
    expected = [profile['identity']['name'], profile['identity']['role'], profile['contact']['email'], 'github.com/BlakeLin-LSY', 'blakelin-lsy.github.io/web-resume', 'Study Atlas', 'Transcribe-for-X']
    for item in profile['professional']:
        expected.extend([item['employer'], item['start'], item['end']])
        if item.get('metric'):
            expected.append(str(item['metric']['value']))
    for value in expected:
        if normalize(value) not in normalized:
            raise ValueError('Missing CV fact: ' + value)
    for forbidden in ['/mnt/', '/home/', 'linkedin.com', 'career-ops-repo']:
        if forbidden in text:
            raise ValueError('Non-public CV field: ' + forbidden)


for item in provenance['inputs']:
    raw = (ROOT / item['file']).read_bytes()
    assert len(raw) == item['bytes'] and hashlib.sha256(raw).hexdigest() == item['sha256'], item['file']
rows = []
for output in provenance['outputs']:
    path = ROOT / 'review/cv-candidates' / output['pdf']
    raw = path.read_bytes()
    assert hashlib.sha256(raw).hexdigest() == output['pdfSha256'], path
    reader = PdfReader(path)
    assert len(reader.pages) == 1, 'Candidate must be one page'
    text = reader.pages[0].extract_text()
    inspect_text(text)
    try:
        inspect_text(text.replace(profile['contact']['email'], '[REMOVED]'))
    except ValueError:
        negative = True
    else:
        raise AssertionError('Missing-contact counterexample was accepted')
    rows.append({'language': output['language'], 'pages': 1, 'bytes': len(raw), 'sha256': output['pdfSha256'], 'factsPresent': True, 'missingContactRejected': negative})
print(json.dumps({'scope': 'Producer checks; not independent human review', 'candidates': rows}, ensure_ascii=False, indent=2))
