import { useNftCollection } from './hooks/use-nft-collection'
import { useNftsForCollection } from './hooks/use-nfts-for-collection'
import { FirestoreProvider } from '@echo/ui'

export const firestoreProvider: FirestoreProvider = {
  hooks: {
    useNftCollection,
    useNftsForCollection
  }
}
