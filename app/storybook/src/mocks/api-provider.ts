import { useNftCollection } from './hooks/use-nft-collection'
import { useNftsForCollection } from './hooks/use-nfts-for-collection'
import { ApiProvider } from '@echo/ui'

export const apiProvider: ApiProvider = {
  hooks: {
    useNftCollection,
    useNftsForCollection
  }
}
