// module.exports = {
//   images: {
//     domains: ['ygzgdxzskwxpngkxugnk.supabase.co'],
//   },
// };

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
})

module.exports = withPWA({
  //next.js config
  reactStrictMode: true,
  images: {
    domains: ['ygzgdxzskwxpngkxugnk.supabase.co'],
  },
})