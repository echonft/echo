import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { initializeFirestoreCollection } from '@echo/firestore/utils/initialize-firestore-collection'

export async function initializeDb() {
  const collectionsToInitialize = [
    CollectionReferenceName.Listings,
    CollectionReferenceName.ListingOffers,
    CollectionReferenceName.ListingPosts,
    CollectionReferenceName.Collections,
    CollectionReferenceName.CollectionDiscordGuilds,
    CollectionReferenceName.CollectionSwapsCount,
    CollectionReferenceName.Nfts,
    CollectionReferenceName.Offers,
    CollectionReferenceName.OfferThreads,
    CollectionReferenceName.Swaps,
    CollectionReferenceName.SwapPosts,
    CollectionReferenceName.Users,
    CollectionReferenceName.Wallets
  ]
  for (const collection of collectionsToInitialize) {
    await initializeFirestoreCollection(collection)
  }
}
