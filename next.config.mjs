/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow Next/Image to optimize images loaded from Unsplash hosts.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
