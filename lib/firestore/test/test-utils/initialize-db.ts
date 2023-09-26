import { initializeDiscordUsers } from '@test-utils/discord-user/initialize-discord-users'
import { initializeListings } from '@test-utils/listing/initialize-listings'
import { initializeListingOffers } from '@test-utils/listing-offer/initialize-listing-offers'
import { initializeListingPosts } from '@test-utils/listing-post/initialize-listing-posts'
import { initializeNfts } from '@test-utils/nft/initialize-nfts'
import { initializeNftCollections } from '@test-utils/nft-collection/initialize-nft-collections'
import { initializeNftCollectionDiscordGuilds } from '@test-utils/nft-collection-discord-guild/initialize-nft-collection-discord-guilds'
import { initializeNftCollectionSwapsCounts } from '@test-utils/nft-collection-swaps-count/initialize-nft-collection-swaps-counts'
import { initializeOffers } from '@test-utils/offer/initialize-offers'
import { initializeOfferPosts } from '@test-utils/offer-post/initialize-offer-posts'
import { initializeSessions } from '@test-utils/session/initialize-sessions'
import { initializeSwaps } from '@test-utils/swap/initialize-swaps'
import { initializeUsers } from '@test-utils/user/initialize-users'
import { initializeWallets } from '@test-utils/wallet/initialize-wallets'

export async function initializeDb() {
  await initializeDiscordUsers()
  await initializeListings()
  await initializeListingOffers()
  await initializeListingPosts()
  await initializeNftCollections()
  await initializeNftCollectionDiscordGuilds()
  await initializeNftCollectionSwapsCounts()
  await initializeNfts()
  await initializeOffers()
  await initializeOfferPosts()
  await initializeSessions()
  await initializeSwaps()
  await initializeUsers()
  await initializeWallets()
}
