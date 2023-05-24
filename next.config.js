/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api.trello.com'],
  },
  serverRuntimeConfig: {
    // Включите эту опцию, чтобы обслуживать статические файлы из папки `public`
    serveStaticAssets: true,
  },
}

module.exports = nextConfig