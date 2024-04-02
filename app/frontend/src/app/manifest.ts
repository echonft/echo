import { METADATA_DESCRIPTION, METADATA_TITLE } from '@echo/frontend/constants/metadata'
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
        sizes: 'any',
        type: 'image/x-icon'
      }
    ]
  }
}
