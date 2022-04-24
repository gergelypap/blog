/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    disableStaticImages: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(jpe?g|gif|png|webp|svg)$/i,
      type: "asset/resource",
      generator: {
        filename: "[name]-[hash][ext]",
        outputPath: "../static/media",
        publicPath: "/_next/static/media/",
      },
    });

    return config;
  },
};

module.exports = nextConfig;
