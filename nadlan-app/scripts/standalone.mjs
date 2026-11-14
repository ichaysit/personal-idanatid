/* בונה שלושה קובצי HTML עצמאיים (קובץ אחד לכל אתר).

   כל קובץ בנוי משתי שכבות:
   1. הדף המלא כ־HTML מוכן (static). הוא מוצג מיד, גם בלי JavaScript,
      עם אפקטים של CSS בלבד. כך הקובץ לעולם אינו נפתח כמסך ריק.
   2. הגרסה המלאה עם התלת־ממד (root). היא נטענת מעל, וכשהיא מוכנה היא מחליפה
      את השכבה הסטטית. אם היא נכשלת, השכבה הסטטית נשארת.

   להרצה: npm run export && node scripts/standalone.mjs [תיקיית יעד] [--artifact] */
import { build } from 'esbuild';
import { parse } from 'node-html-parser';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const exported = path.resolve(root, '../nadlan');
const artifact = process.argv.includes('--artifact');
/* --light: התמונות והגופנים נטענים מהרשת במקום להיות מוטמעים. הקובץ קטן פי ארבעה ונפתח מהר,
   אבל דורש חיבור לאינטרנט. לא מתאים ל־artifact, שחוסם תמונות חיצוניות. */
const light = process.argv.includes('--light') && !artifact;

/* מקור כל תצלום ב־Unsplash: מזהה ורוחב. תמונות ההדמיה (poster, tour) הן שלנו ונשארות מוטמעות. */
const PHOTOS = {
  'tlv-coast': '1500990702037-7620ccb6a60a', 'tower-white': '1479839672679-a46483c0e7c8', 'tower-angular': '1487958449943-2429e8be8625',
  'tower-glass': '1486406146926-c627a92ad1ab', 'tower-bw': '1511818966892-d7d671e672a2', 'apt-block': '1515263487990-61b07816b324',
  'pent-sea': '1600573472550-8090b5e0745e', 'pent-living': '1600607687939-ce8a6c25118c', 'pent-kitchen': '1600585152220-90363fe7e115',
  'terrace-dusk': '1544984243-ec57ea16fe25', 'bedroom-light': '1600607687644-c7171b42498f', 'villa-hero': '1613490493576-7fde63acd811',
  'villa-white': '1600596542815-ffad4c1539a9', 'villa-lawn': '1613977257363-707ba9348227', 'villa-hill': '1580587771525-78b9dba3b914',
  'villa-glass': '1582268611958-ebfd161ef9cf', 'villa-cube': '1512917774080-9991f1c4c750', 'villa-court': '1613553507747-5f8d62ad5904',
  'villa-tall': '1602343168117-bb8ffe3e2e9f', 'villa-poolside': '1600573472592-401b489a3cdc', 'villa-salon': '1613545325278-f24b0cae1224',
  'villa-open': '1600566753086-00f18fb6b3ea', 'pool-night': '1542314831-068cd1dbfeeb', 'house-dusk': '1600585154340-be6161a56a0c',
  'house-tree': '1600607688969-a5bfcd646154', 'house-entry': '1600585154526-990dced4db0d', 'house-gable': '1600563438938-a9a27216b4f5',
  'house-wood': '1600047509807-ba8f99d2cdde', 'house-timber': '1600566753190-17f0baa2a6c3', 'house-white': '1523217582562-09d0def993a6',
  'in-plants': '1600210492486-724fe5c67fb0', 'in-warm': '1618221195710-dd6b41faaea6', 'in-mirror': '1622866306950-81d17097d458',
  'in-bath': '1600566752355-35792bedcfea', 'in-grey': '1600121848594-d8644e57abab',
};
const WIDE = new Set(['tlv-coast', 'villa-hero', 'pool-night', 'house-dusk']);
const GOOGLE_FONTS =
  'https://fonts.googleapis.com/css2?family=Assistant:wght@300..800&family=Frank+Ruhl+Libre:wght@300..900&family=Heebo:wght@300..800&family=IBM+Plex+Sans+Hebrew:wght@300;400;500;600&family=Karantina:wght@300;400;700&family=Miriam+Libre:wght@400;700&display=swap';
const outDir = path.resolve(process.argv.slice(2).find((a) => !a.startsWith('--')) ?? path.join(root, 'standalone'));
const tmp = path.join(root, '.standalone-tmp');
fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(tmp, { recursive: true });

const sites = [
  { key: 'kav-rakia', name: 'קו רקיע', scheme: 'dark', color: '#17111c', title: 'קו רקיע | פנטהאוזים ודירות במגדלי תל אביב' },
  { key: 'bustan', name: 'בוסתן', scheme: 'dark', color: '#141c17', title: 'בוסתן | וילות פרטיות על קו החוף' },
  { key: 'even-vakav', name: 'אבן וקו', scheme: 'light', color: '#dcd8d0', title: 'אבן וקו | בתי אדריכלים בהרי ירושלים, בכרמל ובגליל' },
];

/* עיצוב: ה־CSS שנבנה על ידי Next, עם הגופנים מוטמעים כ־base64 */
const cssDir = path.join(exported, '_next/static/css');
let css = fs.readdirSync(cssDir).map((f) => fs.readFileSync(path.join(cssDir, f), 'utf8')).join('\n');
css = css.replace(/url\((["']?)[^)"']*\/_next\/static\/media\/([^)"']+)\1\)/g, (_, __, file) => {
  const data = fs.readFileSync(path.join(exported, '_next/static/media', file)).toString('base64');
  return `url(data:font/woff2;base64,${data})`;
});

const embed = (name) =>
  'data:image/webp;base64,' + fs.readFileSync(path.join(exported, 'images', `${name}.webp`)).toString('base64');
const dataUri = (name) =>
  light && PHOTOS[name]
    ? `https://images.unsplash.com/photo-${PHOTOS[name]}?w=${WIDE.has(name) ? 1600 : 1100}&q=70&fm=webp&fit=crop`
    : embed(name);

/* במצב light מסירים את הגופנים המוטמעים ונותנים למשפחות את שמות Google Fonts */
function lightCss(input) {
  let out = input.replace(/@font-face\{[^}]*\}/g, '');
  const names = { karantina: 'Karantina', plex: 'IBM Plex Sans Hebrew', frank: 'Frank Ruhl Libre', heebo: 'Heebo', miriam: 'Miriam Libre', assistant: 'Assistant' };
  for (const [k, family] of Object.entries(names)) {
    out = out.replace(new RegExp(`(--font-${k}:)[^;}]*`, 'g'), `$1"${family}",sans-serif`);
  }
  return out;
}

/* תחליפים למודולים של Next שאין להם משמעות בקובץ עצמאי */
const shimDynamic = path.join(tmp, 'dynamic.js');
fs.writeFileSync(
  shimDynamic,
  `import React from 'react';
export default function dynamic(loader) {
  const C = React.lazy(loader);
  return (props) => React.createElement(React.Suspense, { fallback: null }, React.createElement(C, props));
}`,
);
const shimUtils = path.join(tmp, 'utils.ts');
fs.writeFileSync(
  shimUtils,
  fs
    .readFileSync(path.join(root, 'lib/utils.ts'), 'utf8')
    .replace(/export function img\([^]*?\n}/, 'export function img(name: string) {\n  return (window as any).__IMG[name] ?? "";\n}')
    .replace(/export function href\([^]*?\n}/, 'export function href(_path: string) {\n  return "#";\n}'),
);

/* מסירים מה־HTML המוכן את מצבי הפתיחה של האנימציות (שקיפות, הזזה, חיתוך),
   כדי שבלי JavaScript שום דבר לא יישאר מוסתר. */
const MOTION_PROPS = /^(transform|transform-origin|opacity|clip-path|will-change)$/;
function cleanStyle(style) {
  return style
    .split(';')
    .map((d) => d.trim())
    .filter((d) => d && !MOTION_PROPS.test(d.slice(0, d.indexOf(':')).trim()))
    .join(';');
}

function staticMarkup(site) {
  const doc = parse(fs.readFileSync(path.join(exported, site.key, 'index.html'), 'utf8'));
  const page = doc.querySelector('[data-site]');
  page.querySelectorAll('script, template').forEach((n) => n.remove());
  page.querySelectorAll('[style]').forEach((el) => {
    const s = cleanStyle(el.getAttribute('style'));
    if (s) el.setAttribute('style', s);
    else el.removeAttribute('style');
  });
  const used = new Set();
  page.querySelectorAll('img').forEach((el) => {
    const m = /\/images\/([a-z0-9-]+)\.webp/.exec(el.getAttribute('src') ?? '');
    if (!m) return;
    used.add(m[1]);
    el.setAttribute('data-im', m[1]);
    el.setAttribute('src', dataUri(m[1]));
    if (!(light && PHOTOS[m[1]])) el.removeAttribute('loading');
    else if (light) el.setAttribute('crossorigin', 'anonymous');
  });
  /* קישורים פנימיים של האתר המתארח אינם קיימים בקובץ בודד */
  page.querySelectorAll('a[href^="/"]').forEach((a) => a.setAttribute('href', '#'));
  return { html: page.outerHTML, used };
}

for (const site of sites) {
  const entry = path.join(tmp, `${site.key}.tsx`);
  fs.writeFileSync(
    entry,
    `import React from 'react';
import { createRoot } from 'react-dom/client';
import Page from '../app/${site.key}/page';

const w = window as any;
/* אם משהו קורס בזמן הציור, חוזרים לשכבה הסטטית במקום להשאיר מסך ריק */
class Guard extends React.Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    w.__appFailed();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
function Ready() {
  React.useEffect(() => {
    const t = setTimeout(() => w.__appReady(), 60);
    return () => clearTimeout(t);
  }, []);
  return null;
}
createRoot(document.getElementById('root')!).render(
  <Guard>
    <Page />
    <Ready />
  </Guard>,
);`,
  );

  const result = await build({
    entryPoints: [entry],
    bundle: true,
    minify: true,
    write: false,
    format: 'iife',
    target: 'es2019',
    jsx: 'automatic',
    tsconfig: path.join(root, 'tsconfig.json'),
    define: { 'process.env.NODE_ENV': '"production"', 'process.env.NEXT_PUBLIC_BASE_PATH': '""' },
    logOverride: { 'module-level-directive': 'silent' },
    plugins: [
      {
        name: 'standalone-shims',
        setup(b) {
          b.onResolve({ filter: /^next\/dynamic$/ }, () => ({ path: shimDynamic }));
          b.onResolve({ filter: /^@\/lib\/utils$/ }, () => ({ path: shimUtils }));
          b.onResolve({ filter: /\.css$/ }, () => ({ path: 'css', namespace: 'skip' }));
          b.onLoad({ filter: /.*/, namespace: 'skip' }, () => ({ contents: '' }));
        },
      },
    ],
  });
  const js = result.outputFiles[0].text;
  const { html: staticHtml, used } = staticMarkup(site);

  /* תמונות שהקוד צריך ואינן מופיעות ב־HTML המוכן */
  const extra = {};
  for (const f of fs.readdirSync(path.join(exported, 'images'))) {
    const name = f.replace(/\.webp$/, '');
    if (used.has(name)) continue;
    if (js.includes(`"${name}"`) || js.includes(`'${name}'`) || js.includes('`' + name + '`')) extra[name] = dataUri(name);
  }

  const safe = (s) => s.replace(/<\/script/gi, '<\\/script');
  const fontClass = /class="([^"]*)"/.exec(/<html[^>]*>/.exec(fs.readFileSync(path.join(exported, site.key, 'index.html'), 'utf8'))[0])[1];
  const fontLinks = light
    ? `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link rel="stylesheet" href="${GOOGLE_FONTS}">\n`
    : '';
  const styles = `${fontLinks}<style>${(light ? lightCss(css) : css).replace(/<\/style/gi, '<\\/style')}
:root{color-scheme:${site.scheme}}body{background:${site.color};margin:0}</style>`;

  /* סקריפט האתחול: אוסף את התמונות מהשכבה הסטטית, ומחליף שכבות כשהגרסה המלאה מוכנה */
  const boot = `(function(){
var d=document,S=d.getElementById('static'),R=d.getElementById('root'),E=d.documentElement,state=0;
E.classList.add('js');
window.__STANDALONE=true;
window.__IMG=${safe(JSON.stringify(extra))};
S.querySelectorAll('img[data-im]').forEach(function(i){window.__IMG[i.getAttribute('data-im')]=i.getAttribute('src')});
window.__appReady=function(){if(state)return;state=1;var y=window.scrollY;S.hidden=true;R.hidden=false;window.scrollTo(0,y);window.dispatchEvent(new Event('resize'))};
window.__appFailed=function(){state=2;E.classList.remove('js');R.hidden=true;S.hidden=false};
window.addEventListener('error',function(){if(!state)window.__appFailed()});
setTimeout(function(){if(!state)window.__appFailed()},12000);
})();`;

  const note = `<noscript><p class="static-note" style="background:${site.scheme === 'dark' ? '#000c' : '#fffd'};color:${site.scheme === 'dark' ? '#fff' : '#111'}">תצוגה מקדימה. לגרסה המלאה עם התלת־ממד פתחו את הקובץ בדפדפן.</p></noscript>`;

  const body = `<div class="${fontClass}" lang="he" dir="rtl">
<div id="static" class="static">${staticHtml}</div>
<div id="root" hidden></div>
</div>
${note}
<script>${boot}</script>
<script>${safe(js)}</script>`;

  /* מצב artifact: קטע HTML בלי html/head/body, לפרסום כדף מתארח */
  const html = artifact
    ? `<title>${site.name}</title>\n${styles}\n${body}\n`
    : `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="${site.color}">
<title>${site.title}</title>
${styles}
</head>
<body>
${body}
</body>
</html>
`;
  fs.writeFileSync(path.join(outDir, `${site.key}.html`), html);
  console.log(`${site.key}.html`, (html.length / 1048576).toFixed(1) + ' MB', `${used.size} images, ${Object.keys(extra).length} extra`);
}
fs.rmSync(tmp, { recursive: true, force: true });
