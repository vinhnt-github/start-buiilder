/** @type {import('next').NextConfig} */

const NEXT_PUBLIC_URL_API = process.env.NEXT_PUBLIC_URL_API
  ? process.env.NEXT_PUBLIC_URL_API
  : "http://localhost:8081";
const nextConfig = {
  //   distDir: "build",
  env: {
    NEXT_PUBLIC_URL_API,
  },
  distDir: "build",
};

export default nextConfig;
