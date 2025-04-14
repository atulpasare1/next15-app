/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features if needed
  experimental: {
    serverActions: true,
  },
  
  // Configure rewrites to handle API requests and avoid CORS
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://testxlake.iitjobs.com/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
