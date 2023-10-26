import { initializeCollections } from '@test-utils/collection/initialize-collections'
import { initializeCollectionDiscordGuilds } from '@test-utils/collection-discord-guild/initialize-collection-discord-guilds'
import { initializeCollectionSwapsCounts } from '@test-utils/collection-swaps-count/initialize-collection-swaps-counts'
import { initializeListings } from '@test-utils/listing/initialize-listings'
import { initializeListingOffers } from '@test-utils/listing-offer/initialize-listing-offers'
import { initializeListingPosts } from '@test-utils/listing-post/initialize-listing-posts'
import { initializeNfts } from '@test-utils/nft/initialize-nfts'
import { initializeOffers } from '@test-utils/offer/initialize-offers'
import { initializeOfferThreads } from '@test-utils/offer-thread/initialize-offer-threads'
import { initializeSessions } from '@test-utils/session/initialize-sessions'
import { initializeSwaps } from '@test-utils/swap/initialize-swaps'
import { initializeUsers } from '@test-utils/user/initialize-users'
import { initializeWallets } from '@test-utils/wallet/initialize-wallets'

export async function initializeDb() {
  await initializeListings()
  await initializeListingOffers()
  await initializeListingPosts()
  await initializeCollections()
  await initializeCollectionDiscordGuilds()
  await initializeCollectionSwapsCounts()
  await initializeNfts()
  await initializeOffers()
  await initializeOfferThreads()
  await initializeSessions()
  await initializeSwaps()
  await initializeUsers()
  await initializeWallets()
}
