/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",
  reactStrictMode: true,
  images: {
    domains: ['api.trello.com'],
  },
}

module.exports = nextConfig