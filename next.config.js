/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode:true,
   swcMinify:true,
   experimental:{
      appDir:true
   },
   env: {
      // Add your environment variables here
      MONGODB_URI: process.env.MONGODB_URI,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      // ...other environment variables
   }
}

module.exports = nextConfig
