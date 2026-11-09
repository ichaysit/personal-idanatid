#!/bin/bash
# Reconstruit index.html (site publié) à partir des sources de ce dossier.
# Usage, depuis la racine du dépôt : bash SOURCE/build.sh
set -e
HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(dirname "$HERE")"
bash "$HERE/setup.sh" >/dev/null
OUT="$(mktemp --suffix=.html)"
(cd /home/claude/idanatid-v2 && ./make.sh "$OUT")
cp "$OUT" "$ROOT/index.html"
rm -f "$OUT"
echo "index.html reconstruit."
