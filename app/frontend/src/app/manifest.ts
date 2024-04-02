import { type MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Echo',
    short_name: 'Echo',
    description:
      'Experience secure, seamless NFT swapping with Echo! Our beta is now live on mainnet. Join the revolution today! 🚀',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon'
      }
    ]
  }
}
