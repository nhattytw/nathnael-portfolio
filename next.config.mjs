/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Ship the encrypted certificate previews with the API route's function bundle.
  outputFileTracingIncludes: {
    "/api/cert/[id]": ["./private/certificates/*.enc"],
  },
}

export default nextConfig
