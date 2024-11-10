import { metadataDescription, metadataTitle } from '@echo/frontend/lib/constants/metadata'
import { type MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: metadataTitle,
    short_name: metadataTitle,
    description: metadataDescription,
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '16x16',
        type: 'image/x-icon'
      },
      {
        src: '/icon-16x16.png',
        sizes: '16x16',
        type: 'image/png'
      },
      {
        src: '/icon-32x32.png',
        sizes: '32x32',
        type: 'image/png'
      },
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  }
}
