import type { Collection } from '@echo/model/types/collection'

export type CollectionProviderResult = Pick<
  Collection,
  'id' | 'profilePictureUrl' | 'name' | 'totalSupply' | 'bannerUrl'
>
