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
      {
        protocol: "https" as const,
        hostname: "rfehfdthjyysdkpzspzl.supabase.co",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withNextIntl(nextConfig);
