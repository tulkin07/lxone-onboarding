/** @type {import('next').NextConfig} */

const nextConfig = {
   typescript: {
    ignoreBuildErrors: true, // ✅ build to‘xtamaydi
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/",
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig
