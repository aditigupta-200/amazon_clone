import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
      remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
      // domains: ['media.istockphoto.com','images.unsplash.com', 'plus.unsplash.com'],// Add allowed domains here
  },
   webpack: (config) => {
    config.module.rules.push({
      test: /\.ts$/,
      use: 'ts-loader',
      include: [/shared\/src/],
    });
    return config;
  },
};

export default nextConfig;
