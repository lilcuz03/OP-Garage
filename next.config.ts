import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  async redirects() {
    return [
      {
        source: "/garage-and-gate-installations",
        destination: "/services/garage-doors",
        permanent: true,
      },
      {
        source: "/electric-fence-installations",
        destination: "/services/electric-fences",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
