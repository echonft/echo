import { METADATA_DESCRIPTION, METADATA_TITLE } from '@echo/frontend/lib/constants/metadata'
import { type MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: METADATA_TITLE,
    short_name: METADATA_TITLE,
    description: METADATA_DESCRIPTION,
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
