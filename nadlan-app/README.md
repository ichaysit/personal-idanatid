# שלושה אתרי נדל״ן לדוגמה / Trois sites d'agences immobilières

Trois sites de démonstration pour des agences immobilières fictives en Israël, entièrement en hébreu (RTL).
Agences, biens, prix et numéros de téléphone sont inventés.

| Site | Adresse | Sujet | Scène 3D |
|---|---|---|---|
| קו רקיע | `/nadlan/kav-rakia/` | tours et penthouses à Tel-Aviv | ville de tours instanciées, fenêtres lumineuses en shader |
| בוסתן | `/nadlan/bustan/` | villas avec piscine sur la côte | eau en shader qui déforme la photo et suit le curseur |
| אבן וקו | `/nadlan/even-vakav/` | maisons d'architecte dans les collines | relief en courbes de niveau, épingles cliquables |

## Technique

Next.js (export statique), React Three Fiber, drei, postprocessing (Bloom), Tailwind CSS 4, Motion.

```
app/            pages et styles globaux (les trois palettes sont dans globals.css)
components/
  layout/       Navbar, Footer, Container
  ui/           Button, Card (inclinaison 3D), GlassCard, Badge, Input
  sections/     sections de chaque site + formulaire de contact commun
  three/        SceneCanvas, HeroScene, CityScene, WaterScene, TerrainScene, Particles
  animations/   ScrollReveal, ParallaxWrapper, StaggerContainer
lib/            constants.ts (tout le contenu), utils.ts
styles/         fonts.ts (next/font)
public/images/  photos (Unsplash)
```

## Modifier le contenu

Tout le texte, les biens, les prix et les téléphones sont dans `lib/constants.ts`.

## Développement et mise en ligne

```bash
npm install
```

```bash
npm run dev
```

Le site publié est le dossier `../nadlan/` (GitHub Pages sert le dépôt tel quel). Après une modification :

```bash
npm run export
```

Cette commande reconstruit le site et remplace `../nadlan/`.

## Fichiers HTML autonomes

Pour obtenir un seul fichier HTML par site (code, polices et photos intégrés, ouvrable par double-clic) :

```bash
npm run export
```

```bash
npm run standalone
```

Les trois fichiers sont écrits dans `standalone/` (non versionné, environ 5 Mo chacun).
