/** @type {import('next').NextConfig} */
// const nextConfig = {};

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /pdf\.worker(\.min)?\.js$/,
      use: { loader: "file-loader", options: { name: "[name].[contenthash].[ext]" } },
    });

    return config;
  },
};

export default nextConfig;
