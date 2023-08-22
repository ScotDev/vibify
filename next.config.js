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
    ],
  },
};

module.exports = nextConfig;
