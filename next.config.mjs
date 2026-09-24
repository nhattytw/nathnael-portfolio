/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Ship the encrypted certificate previews with the API route's function bundle.
  outputFileTracingIncludes: {
    "/api/cert/[id]": ["./private/certificates/*.enc"],
  },
}

export default nextConfig
