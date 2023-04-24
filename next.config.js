const withPWA = require("next-pwa");

const config = {
  // here goes your Next.js configuration
  reactStrictMode: true,
};

module.exports = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  scope: "/",
  sw: "service-worker.js",
})(config);
