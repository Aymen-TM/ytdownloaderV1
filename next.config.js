/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_YOUTUBE_KEY: process.env.NEXT_PUBLIC_YOUTUBE_KEY,
  },
  images: {
    domains: [
      'i.ytimg.com',
      'localhost'
    ],
  }
}
module.exports = nextConfig
