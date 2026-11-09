#!/bin/bash
# Recrée la disposition de dossiers attendue par les scripts de construction (chemins absolus /home/claude/...).
set -e
HERE="$(cd "$(dirname "$0")" && pwd)"
mkdir -p /home/claude /tmp/claude-0/work
for d in idanatid-v2 idanatid-multipage idanatid-v2.bak10 idanatid-multipage.bak10; do
  rm -rf /home/claude/$d; cp -r "$HERE/$d" /home/claude/$d
done
cp "$HERE/shader8.js" /home/claude/shader8.js
cp "$HERE/extra.css" /tmp/extra.css
chmod +x /home/claude/idanatid-v2/make.sh
echo "Prêt. Construire : cd /home/claude/idanatid-v2 && ./make.sh /home/claude/idanatid-site-NOUVEAU.html"
