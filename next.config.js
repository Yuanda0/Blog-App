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
         },
         {
            protocol: "https",
            hostname: "miro.medium.com"
         },
         {
            protocol: "https",
            hostname: "developer.sas.com"
         },
         {
            protocol: "https",
            hostname: "velog.velcdn.com"
         },
         {
            protocol: "https",
            hostname: "cdn.discordapp.com"
         }
      ]
   }
}

module.exports = nextConfig
