/* בונה שלושה קובצי HTML עצמאיים (קובץ אחד לכל אתר), שנפתחים בלחיצה כפולה:
   הקוד, הגופנים והתמונות מוטמעים בתוך הקובץ.
   להרצה: npm run export && node scripts/standalone.mjs [תיקיית יעד] */
import { build } from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const exported = path.resolve(root, '../nadlan');
const outDir = path.resolve(process.argv[2] ?? path.join(root, 'standalone'));
const tmp = path.join(root, '.standalone-tmp');
fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(tmp, { recursive: true });

const sites = [
  { key: 'kav-rakia', color: '#17111c', title: 'קו רקיע | פנטהאוזים ודירות במגדלי תל אביב' },
  { key: 'bustan', color: '#141c17', title: 'בוסתן | וילות פרטיות על קו החוף' },
  { key: 'even-vakav', color: '#dcd8d0', title: 'אבן וקו | בתי אדריכלים בהרי ירושלים, בכרמל ובגליל' },
];

/* עיצוב: ה־CSS שנבנה על ידי Next, עם הגופנים מוטמעים כ־base64 */
const cssDir = path.join(exported, '_next/static/css');
let css = fs.readdirSync(cssDir).map((f) => fs.readFileSync(path.join(cssDir, f), 'utf8')).join('\n');
css = css.replace(/url\((["']?)[^)"']*\/_next\/static\/media\/([^)"']+)\1\)/g, (_, __, file) => {
  const data = fs.readFileSync(path.join(exported, '_next/static/media', file)).toString('base64');
  return `url(data:font/woff2;base64,${data})`;
});
const htmlTag = fs.readFileSync(path.join(exported, 'bustan/index.html'), 'utf8').match(/<html[^>]*>/)[0];

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

for (const site of sites) {
  const entry = path.join(tmp, `${site.key}.tsx`);
  fs.writeFileSync(
    entry,
    `import React from 'react';
import { createRoot } from 'react-dom/client';
import Page from '../app/${site.key}/page';
createRoot(document.getElementById('root')!).render(<Page />);`,
  );

  const result = await build({
    entryPoints: [entry],
    bundle: true,
    minify: true,
    write: false,
    format: 'iife',
    target: 'es2020',
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

  /* רק התמונות שהאתר הזה באמת משתמש בהן */
  const images = {};
  for (const f of fs.readdirSync(path.join(exported, 'images'))) {
    const name = f.replace(/\.webp$/, '');
    if (js.includes(`"${name}"`) || js.includes(`'${name}'`) || js.includes('`' + name + '`')) {
      images[name] = 'data:image/webp;base64,' + fs.readFileSync(path.join(exported, 'images', f)).toString('base64');
    }
  }

  const safe = (s) => s.replace(/<\/script/gi, '<\\/script');
  const html = `<!DOCTYPE html>
${htmlTag}
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="${site.color}">
<title>${site.title}</title>
<style>${css.replace(/<\/style/gi, '<\\/style')}</style>
</head>
<body>
<div id="root"></div>
<script>window.__IMG=${safe(JSON.stringify(images))};</script>
<script>${safe(js)}</script>
</body>
</html>
`;
  const file = path.join(outDir, `${site.key}.html`);
  fs.writeFileSync(file, html);
  console.log(`${site.key}.html`, (html.length / 1048576).toFixed(1) + ' MB', Object.keys(images).length + ' images');
}
fs.rmSync(tmp, { recursive: true, force: true });
