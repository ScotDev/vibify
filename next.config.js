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
    ],
  },
};

module.exports = nextConfig;
