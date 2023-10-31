import { assertCollections } from '@test-utils/collection/assert-collections'
import { assertCollectionDiscordGuilds } from '@test-utils/collection-discord-guild/assert-collection-discord-guilds'
import { assertCollectionSwapsCounts } from '@test-utils/collection-swaps-count/assert-collection-swaps-counts'
import { assertListings } from '@test-utils/listing/assert-listings'
import { assertListingOffers } from '@test-utils/listing-offer/assert-listing-offers'
import { assertListingPosts } from '@test-utils/listing-post/assert-listing-posts'
import { assertNfts } from '@test-utils/nft/assert-nfts'
import { assertOffers } from '@test-utils/offer/assert-offers'
import { assertOfferThreads } from '@test-utils/offer-thread/assert-offer-threads'
import { assertSessions } from '@test-utils/session/assert-sessions'
import { assertSwaps } from '@test-utils/swap/assert-swaps'
import { assertUsers } from '@test-utils/user/assert-users'
import { assertWallets } from '@test-utils/wallet/assert-wallets'

export async function assertDb() {
  await assertListings()
  await assertListingOffers()
  await assertListingPosts()
  await assertCollections()
  await assertCollectionDiscordGuilds()
  await assertCollectionSwapsCounts()
  await assertNfts()
  await assertOffers()
  await assertOfferThreads()
  await assertSessions()
  await assertSwaps()
  await assertUsers()
  await assertWallets()
}
