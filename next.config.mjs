/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true,
    serverComponentsExternalPackages: ['mongoose', 'bcryptjs'],
  },
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com', 'cdn.pixabay.com'],
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
  transpilePackages: ['@core'],
};

export default nextConfig;
