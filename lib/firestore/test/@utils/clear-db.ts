import { clearCollections } from '@echo/firestore-test/collection/clear-collections'
import { clearCollectionDiscordGuilds } from '@echo/firestore-test/collection-discord-guild/clear-collection-discord-guilds'
import { clearCollectionSwapsCounts } from '@echo/firestore-test/collection-swaps-count/clear-collection-swaps-counts'
import { clearListings } from '@echo/firestore-test/listing/clear-listings'
import { clearListingPosts } from '@echo/firestore-test/listing-post/clear-listing-posts'
import { clearNfts } from '@echo/firestore-test/nft/clear-nfts'
import { clearOffers } from '@echo/firestore-test/offer/clear-offers'
import { clearOfferThreads } from '@echo/firestore-test/offer-thread/clear-offer-threads'
import { clearSwaps } from '@echo/firestore-test/swap/clear-swaps'
import { clearUsers } from '@echo/firestore-test/user/clear-users'
import { clearWallets } from '@echo/firestore-test/wallet/clear-wallets'

export async function clearDb() {
  await clearListings()
  await clearListingPosts()
  await clearCollections()
  await clearCollectionDiscordGuilds()
  await clearCollectionSwapsCounts()
  await clearNfts()
  await clearOffers()
  await clearOfferThreads()
  await clearSwaps()
  await clearUsers()
  await clearWallets()
}
