import { Nft } from '../nft'
import { NftCollection } from '../nft-collection'
import { NftTraits } from '../nft-traits'
import { SWRResponse } from 'swr'

export interface FirestoreHooks {
  useNftCollection: (slug: string) => SWRResponse<NftCollection, Error>
  useNftsForCollection: (collectionSlug: string, traits?: NftTraits) => SWRResponse<Nft[], Error>
}
