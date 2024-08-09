/** @type {import('next').NextConfig} */

const NEXT_PUBLIC_ENABLE_MSW =
  process.env.NODE_ENV === "development"
    ? "false"
    : process.env.NEXT_PUBLIC_ENABLE_MSW
    ? "true"
    : false;

const NEXT_PUBLIC_URL_API = process.env.NEXT_PUBLIC_URL_API
  ? process.env.NEXT_PUBLIC_URL_API
  : "https://msw.com";
const nextConfig = {
  //   distDir: "build",
  env: {
    NEXT_PUBLIC_ENABLE_MSW,
    NEXT_PUBLIC_URL_API,
  },
};

export default nextConfig;
