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
      }
    ]
  }
}
