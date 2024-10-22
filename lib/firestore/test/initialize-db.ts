import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { initializeFirestoreCollection } from '@echo/test/firestore/initialize-firestore-collection'

export async function initializeDb() {
  const collectionsToInitialize = [
    CollectionReferenceName.Collections,
    CollectionReferenceName.CollectionDiscordGuilds,
    CollectionReferenceName.CollectionSwapsCount,
    CollectionReferenceName.Listings,
    CollectionReferenceName.Nfts,
    CollectionReferenceName.Offers,
    CollectionReferenceName.Swaps,
    CollectionReferenceName.Users,
    CollectionReferenceName.Wallets
  ]
  for (const collection of collectionsToInitialize) {
    await initializeFirestoreCollection(collection)
  }
}
