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

const dataUri = (name) =>
  'data:image/webp;base64,' + fs.readFileSync(path.join(exported, 'images', `${name}.webp`)).toString('base64');

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
    el.removeAttribute('loading');
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
  const styles = `<style>${css.replace(/<\/style/gi, '<\\/style')}
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
