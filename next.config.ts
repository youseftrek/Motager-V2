import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https" as const,
        hostname: "images.pexels.com",
      },
      {
        protocol: "https" as const,
        hostname: "duuw10jl1n.ufs.sh",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
