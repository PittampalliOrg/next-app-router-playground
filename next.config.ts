import type { NextConfig } from 'next';

const config: NextConfig = {
  basePath: '/playground',
  productionBrowserSourceMaps: true,
  experimental: {
    nodeMiddleware: true,
  },
};

export default config;
