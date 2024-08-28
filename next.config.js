// module.exports = {
//   webpackDevMiddleware: (config) => {
//     config.watchOptions.poll = 300;
//     return config;
//   },
// };
module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: process.env.NODE_ENV === 'development'
            ? 'http://localhost:4000/api/:path*'
            : 'https://dev.technohub.cloud/api/:path*',
        },
      ];
    },
    async headers() {
      return [
        {
          source: '/api/:path*',
          headers: [
            { key: 'Access-Control-Allow-Credentials', value: 'true' },
            { key: 'Access-Control-Allow-Origin', value: '*' },
          ],
        },
      ];
    },
  };
  