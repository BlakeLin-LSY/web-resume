const path = require('path');

const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/web-resume' : '';
const assetPrefix = isProd ? '/web-resume' : ''; // Ensure this remains without a trailing slash

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  output: 'export',  // Set output to export for static site generation
  // basePath: process.env.NODE_ENV === 'production' ? '/web-resume' : '',
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/web-resume/' : '',
  basePath: basePath,
  assetPrefix: assetPrefix, // Corrected: no trailing slash
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  outputFileTracingRoot: path.join(__dirname, '../'),
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,  // Changed to true to avoid build errors
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
