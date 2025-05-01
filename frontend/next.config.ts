// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.pexels.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
