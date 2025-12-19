/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/algemene-voorwaarden',
        destination: '/legal?tab=terms',
        permanent: true,
      },
      {
        source: '/privacy',
        destination: '/legal?tab=privacy',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
