const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '/nadlan';

/** @type {import('next').NextConfig} */
export default {
  output: 'export',
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  transpilePackages: ['three'],
};
