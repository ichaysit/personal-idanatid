#!/bin/bash
# usage: make.sh /chemin/sortie.html
set -e
cd /home/claude/idanatid-v2
python3 patch1.py >/dev/null && python3 patch2.py >/dev/null && python3 patch3.py >/dev/null && python3 patch4.py >/dev/null && python3 patch5.py >/dev/null && python3 patch7.py >/dev/null && python3 patch8.py >/dev/null && python3 patch9.py >/dev/null && python3 patch9.py >/dev/null
cat /tmp/extra.css >> new.css
cp assets/fx.js /tmp/fx_clean.js
cat /home/claude/shader8.js >> assets/fx.js
sed -i "s#open('[^']*','w').write(out)#open('$1','w').write(out)#" bundle.py
python3 build2.py >/dev/null
python3 bundle.py | tail -1
cp /tmp/fx_clean.js assets/fx.js
