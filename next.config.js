/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // webpack: (config) => {
  //   config.module.rules.push({
  //     test: /\.(svg|png|jpe?g|gif|mp4)$/i,
  //     use: [
  //       {
  //         loader: "file-loader",
  //         options: {
  //           publicPath: "/_next",
  //           name: "static/media/[name].[hash].[ext]",
  //         },
  //       },
  //     ],
  //   });

  //   return config;
  // },
};

module.exports = nextConfig;
