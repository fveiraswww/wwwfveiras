/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  logging: {
    fetches: { fullUrl: true },
  },
  reactStrictMode: true,
  experimental: {
    ppr: true,
  },
  images: {
    remotePatterns: [
      { hostname: 'basehub.earth' },
      { hostname: 'assets.basehub.com' },
    ],
  },
}
