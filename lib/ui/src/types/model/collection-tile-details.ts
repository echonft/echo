import type { Collection } from '@echo/ui/types/model/collection'

export interface CollectionTileDetails extends Pick<Collection, 'slug' | 'name'> {
  profilePictureUrl: string
  swapsCount: number
}
