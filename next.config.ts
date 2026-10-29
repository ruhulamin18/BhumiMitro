import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  turbopack: {},
  // Allow access to remote image placeholder.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**', // This allows any path under the hostname
      },
    ],
  },
  output: 'standalone',
  transpilePackages: ['motion'],
  async redirects() {
    return [
      {
        source: '/reports',
        destination: '/report',
        permanent: true,
      },
      {
        source: '/khas-char',
        destination: '/char-land',
        permanent: false,
      },
      {
        source: '/dopter',
        destination: '/multi-office',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
