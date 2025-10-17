/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone', // ✅ must be standalone, not export
  images: {
    unoptimized: true,
    domains: ['guku.ai'],
  },
};

export default nextConfig;
