/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['profile.line-scdn.net'],
  },
}

module.exports = nextConfig
