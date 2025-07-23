import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const basePath = isProd ? '/docs' : '';

const nextConfig: NextConfig = {
  /* config options here */
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  output: 'export'
};

export default nextConfig;
