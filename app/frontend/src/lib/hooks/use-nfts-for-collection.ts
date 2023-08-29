import { nftCollectionNftsApiUrl } from '@echo/api-public'
import { Nft, NftTraits } from '@echo/ui-model'
import { getData } from '@echo/utils'
import useSWR from 'swr'

export const useNftsForCollection = (collectionSlug: string, _traits?: NftTraits) =>
  useSWR<Nft[], Error, URL>(nftCollectionNftsApiUrl(collectionSlug), getData)
