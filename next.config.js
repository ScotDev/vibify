/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // Spotify image storage
        hostname: "scontent-fra5-1.xx.fbcdn.net",
        // port: "",
        // pathname: "/account123/**",
      },
      { protocol: "https", hostname: "i.scdn.co" },
      { protocol: "https", hostname: "scontent-ams2-1.xx.fbcdn.net" },
      { protocol: "https", hostname: "scontent-ams4-1.xx.fbcdn.net" },
      { protocol: "https", hostname: "scontent-lcy1-1.xx.fbcdn.net" },
      { protocol: "https", hostname: "scontent-cdg4-3.xx.fbcdn.net" },
      { protocol: "https", hostname: "scontent-fra5-2.xx.fbcdn.net" },
    ],
  },
  experimental: { serverActions: true },
};

module.exports = nextConfig;
