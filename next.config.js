/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcrypt'],
  },
  reactStrictMode: false,
  compiler: {
    emotion: true,
  },
  images: {
    domains: [
      'picsum.photos',
      'raw.githubusercontent.com',
      'cdn.shopify.com',
      'plus.unsplash.com',
      'images.pexels.com',
      'static.nike.com',
      'static.zara.net',
      'lh3.googleusercontent.com',
      'i.ibb.co',
    ],
  },
}

module.exports = nextConfig
