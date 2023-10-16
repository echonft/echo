import { clearCollections } from '@test-utils/collection/clear-collections'
import { clearCollectionDiscordGuilds } from '@test-utils/collection-discord-guild/clear-collection-discord-guilds'
import { clearCollectionSwapsCounts } from '@test-utils/collection-swaps-count/clear-collection-swaps-counts'
import { clearListings } from '@test-utils/listing/clear-listings'
import { clearListingOffers } from '@test-utils/listing-offer/clear-listing-offers'
import { clearListingPosts } from '@test-utils/listing-post/clear-listing-posts'
import { clearNfts } from '@test-utils/nft/clear-nfts'
import { clearOffers } from '@test-utils/offer/clear-offers'
import { clearOfferPosts } from '@test-utils/offer-post/clear-offer-posts'
import { clearSessions } from '@test-utils/session/clear-sessions'
import { clearSwaps } from '@test-utils/swap/clear-swaps'
import { clearUsers } from '@test-utils/user/clear-users'
import { clearWallets } from '@test-utils/wallet/clear-wallets'

export async function clearDb() {
  await clearListings()
  await clearListingOffers()
  await clearListingPosts()
  await clearCollections()
  await clearCollectionDiscordGuilds()
  await clearCollectionSwapsCounts()
  await clearNfts()
  await clearOffers()
  await clearOfferPosts()
  await clearSessions()
  await clearSwaps()
  await clearUsers()
  await clearWallets()
}
