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
      {
        source: '/login',
        destination: 'https://dashboard.sjef.ai/login',
        permanent: true,
      },
      {
        source: '/register',
        destination: 'https://dashboard.sjef.ai/login?view=sign-up',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
