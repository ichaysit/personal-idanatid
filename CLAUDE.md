# Consignes permanentes pour Claude Code (site Idanatid)

Propriétaire : Ichay Sitbon (ישי סיטבון), agence Idanatid. Il parle français et hébreu. Réponds-lui en français, simplement, sans jargon.

## Règle de publication
Ne publie JAMAIS sur GitHub sans que Ichay l'ait dit explicitement. Par défaut : construis, montre un aperçu, puis demande « je le mets en ligne ? ». Rien n'est publié tant qu'il n'a pas répondu oui.
Avant de pousser : `git pull --rebase origin main`. Pas de force push.

## Règles d'écriture (textes du site, dans les 4 langues he, fr, en, ru)
- Pas de tiret cadratin (—). Pas d'emoji. Pas de gras décoratif.
- Pas de tournure « ce n'est pas X, c'est Y » ni ses équivalents.
- Éviter les énumérations par trois et les formules d'atténuation.
- Respecter la liste de mots interdits fournie par Ichay (à lui redemander si besoin).
- Parler à la première personne (« je ») et s'adresser au client (« vous »).
- Aucun faux témoignage, aucun faux compteur, aucun chiffre inventé.
- Prix écrits sans virgule ni espace : 1500 ₪, 17000+ ₪.

## Règles de code et de sécurité
- Aucune clé d'API dans le navigateur ni dans le dépôt. Les clés restent des secrets Supabase.
- Base de données : RLS activé partout. CORS en liste blanche. Limite de débit sur les endpoints publics.
- Responsive mobile first, accessibilité (contraste, focus, aria), micro-animations discrètes.
- Pile : HTML5, CSS, JavaScript vanilla, fichier unique pour le site publié (Tailwind via CDN accepté pour de nouveaux projets).
- Le site doit rester prêt à déployer sur GitHub Pages (idanatid.com) sans étape de build côté serveur.

## Ce qui a été abandonné
La version « v6 » (refonte avec la police Rubik et Adobe Fonts) a été abandonnée à la demande d'Ichay. Ne pas la reprendre.

## Organisation du dépôt
- `index.html` : le site publié (fichier unique, environ 1,3 Mo, CSS, JS et images en base64). Il est GÉNÉRÉ : ne pas l'éditer à la main pour un gros changement.
- `404.html`, favicons, `CNAME` (idanatid.com), `robots.txt`, `sitemap.xml` : fichiers publiés à côté.
- `SOURCE/` : sources et scripts qui fabriquent `index.html`.
  - `idanatid-multipage/` : pages HTML de départ et `assets/app.js` (source du JavaScript : `build2.py` réécrit `idanatid-v2/assets/app.js` à partir de lui).
  - `idanatid-v2/` : `patch1.py` à `patch9.py` (patch6 abandonné), `build2.py`, `bundle.py`, `make.sh`, `new.css`, traductions (`calc_i18n.py`, `tr_en.py`, `tr_ru.py`, `kb_i18n.py`), `assets/home.js`, `assets/fx.js`, photos.
  - `shader8.js` (fond WebGL), `extra.css`.
  - `*.bak10` : copies de référence relues par `patch1.py` (rendent les patchs idempotents). Ne pas supprimer.
- `supabase/functions/chat/index.ts` : fonction Edge du chatbot (projet `vldpnobmfpjlmmseevum`). Son prompt système contient les offres et conditions : tout changement de prix ou de condition se fait dans `index.ts` ET sur le site.

## Reconstruire le site
`bash SOURCE/build.sh` depuis la racine : copie les sources vers `/home/claude/` (les scripts utilisent des chemins absolus), lance `make.sh` et remplace `index.html`. Sans modification des sources, le résultat est identique octet pour octet au fichier publié.
Textes : français dans le HTML, hébreu dans le dictionnaire `HE` de `app.js`, anglais et russe dans `TX.en` et `TX.ru`.
Vérifier ensuite avec Playwright (Chromium, `--use-gl=swiftshader --enable-webgl --ignore-gpu-blocklist`) : en-tête de 320 à 1920 px, toutes les pages dans les 4 langues, calculs de l'estimateur.

## Points ouverts connus
- `robots.txt`, `sitemap.xml` et la balise canonical pointent encore vers github.io au lieu de idanatid.com.
- Numéro d'osek à ajouter dans les pages légales.
- Prix de l'offre E-commerce : le site et le chatbot disent 8000 / 15000 / 17000+ ₪, un ancien document dit 4500 / 6000 / 8000+. À faire confirmer par Ichay.
