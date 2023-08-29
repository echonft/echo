import { Nft, NftCollection, NftTraits } from '@echo/ui-model'
import { SWRResponse } from 'swr'

export interface ApiHooks {
  useNftCollection: (slug: string) => SWRResponse<NftCollection, Error>
  useNftsForCollection: (collectionSlug: string, traits?: NftTraits) => SWRResponse<Nft[], Error>
}
