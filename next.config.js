/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@nivo"],
  experimental: { esmExternals: "loose" },
  async rewrites() {
    return [
      {
        source: "/fetch",
        destination:
          "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty",
      },
    ];
  },
};

module.exports = nextConfig
