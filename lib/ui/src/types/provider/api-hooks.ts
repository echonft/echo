import { Nft, NftCollection } from '@echo/ui-model'
import { SWRResponse } from 'swr'

export interface ApiHooks {
  useNftCollection: (slug: string) => SWRResponse<NftCollection, Error>
  useNftsForCollection: (collectionSlug: string) => SWRResponse<Nft[], Error>
}
