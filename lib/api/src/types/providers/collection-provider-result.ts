import type { Collection } from '@echo/model/types/collection'

export type CollectionProviderResult = Pick<
  Collection,
  'bannerUrl' | 'name' | 'profilePictureUrl' | 'totalSupply' | 'slug'
>
