import { ApiProvider } from '@echo/ui'
import { useNftCollection } from '@lib/hooks/use-nft-collection'
import { useNftsForCollection } from '@lib/hooks/use-nfts-for-collection'

export const apiProvider: ApiProvider = {
  hooks: {
    useNftCollection,
    useNftsForCollection
  }
}
