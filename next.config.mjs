/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "yts.mx",
                pathname: "/assets/images/**",
            },
        ],
    },
};

export default nextConfig;
