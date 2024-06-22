// next.config.js
module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/proxy/:path*',
          destination: 'https://search.dip.bundestag.de/api/v1/:path*',
        },
      ]
    },
  }
  