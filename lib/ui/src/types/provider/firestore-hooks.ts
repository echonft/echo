import { Nft, NftCollection, NftTraits } from '@echo/model'
import { SWRResponse } from 'swr'

export interface FirestoreHooks {
  useNftCollection: (slug: string) => SWRResponse<NftCollection, Error>
  useNftsForCollection: (collectionSlug: string, traits?: NftTraits) => SWRResponse<Nft[], Error>
}
