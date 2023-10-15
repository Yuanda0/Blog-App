/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: "www.drupal.org",
         },
         {
            protocol: 'https',
            hostname: 'upload.wikimedia.org'
         },
         {
            protocol: 'https',
            hostname: 'logolook.net'
         }
      ]
   }
}

module.exports = nextConfig
