import { initializeCollections } from '@echo/firestore/utils/collection/initialize-collections'
import { initializeCollectionDiscordGuilds } from '@echo/firestore/utils/collection-discord-guild/initialize-collection-discord-guilds'
import { initializeCollectionSwapsCounts } from '@echo/firestore/utils/collection-swaps-count/initialize-collection-swaps-counts'
import { initializeListings } from '@echo/firestore/utils/listing/initialize-listings'
import { initializeListingOffers } from '@echo/firestore/utils/listing-offer/initialize-listing-offers'
import { initializeListingPosts } from '@echo/firestore/utils/listing-post/initialize-listing-posts'
import { initializeNfts } from '@echo/firestore/utils/nft/initialize-nfts'
import { initializeOffers } from '@echo/firestore/utils/offer/initialize-offers'
import { initializeOfferThreads } from '@echo/firestore/utils/offer-thread/initialize-offer-threads'
import { initializeSwaps } from '@echo/firestore/utils/swap/initialize-swaps'
import { initializeSwapPosts } from '@echo/firestore/utils/swap-post/initialize-swap-posts'
import { initializeUsers } from '@echo/firestore/utils/user/initialize-users'
import { initializeWallets } from '@echo/firestore/utils/wallet/initialize-wallets'

export async function initializeDb() {
  // TODO iterate through CollectionReferenceName instead
  await initializeListings()
  await initializeListingOffers()
  await initializeListingPosts()
  await initializeCollections()
  await initializeCollectionDiscordGuilds()
  await initializeCollectionSwapsCounts()
  await initializeNfts()
  await initializeOffers()
  await initializeOfferThreads()
  await initializeSwaps()
  await initializeSwapPosts()
  await initializeUsers()
  await initializeWallets()
}
