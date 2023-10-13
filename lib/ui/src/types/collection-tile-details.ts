import type { Collection } from '@echo/model/types/collection'

export interface CollectionTileDetails extends Pick<Collection, 'slug' | 'name'> {
  profilePictureUrl: string
  swapsCount: number
}
