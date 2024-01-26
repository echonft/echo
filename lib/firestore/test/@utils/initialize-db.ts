import { initializeCollections } from '@echo/firestore-test/collection/initialize-collections'
import { initializeCollectionDiscordGuilds } from '@echo/firestore-test/collection-discord-guild/initialize-collection-discord-guilds'
import { initializeCollectionSwapsCounts } from '@echo/firestore-test/collection-swaps-count/initialize-collection-swaps-counts'
import { initializeListings } from '@echo/firestore-test/listing/initialize-listings'
import { initializeListingPosts } from '@echo/firestore-test/listing-post/initialize-listing-posts'
import { initializeNfts } from '@echo/firestore-test/nft/initialize-nfts'
import { initializeOffers } from '@echo/firestore-test/offer/initialize-offers'
import { initializeOfferThreads } from '@echo/firestore-test/offer-thread/initialize-offer-threads'
import { initializeSwaps } from '@echo/firestore-test/swap/initialize-swaps'
import { initializeUsers } from '@echo/firestore-test/user/initialize-users'
import { initializeWallets } from '@echo/firestore-test/wallet/initialize-wallets'

export async function initializeDb() {
  await initializeListings()
  await initializeListingPosts()
  await initializeCollections()
  await initializeCollectionDiscordGuilds()
  await initializeCollectionSwapsCounts()
  await initializeNfts()
  await initializeOffers()
  await initializeOfferThreads()
  await initializeSwaps()
  await initializeUsers()
  await initializeWallets()
}
