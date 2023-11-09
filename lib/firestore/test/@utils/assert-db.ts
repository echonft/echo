import { assertCollections } from '@echo/firestore-test/collection/assert-collections'
import { assertCollectionDiscordGuilds } from '@echo/firestore-test/collection-discord-guild/assert-collection-discord-guilds'
import { assertCollectionSwapsCounts } from '@echo/firestore-test/collection-swaps-count/assert-collection-swaps-counts'
import { assertListings } from '@echo/firestore-test/listing/assert-listings'
import { assertListingOffers } from '@echo/firestore-test/listing-offer/assert-listing-offers'
import { assertListingPosts } from '@echo/firestore-test/listing-post/assert-listing-posts'
import { assertNfts } from '@echo/firestore-test/nft/assert-nfts'
import { assertOffers } from '@echo/firestore-test/offer/assert-offers'
import { assertOfferThreads } from '@echo/firestore-test/offer-thread/assert-offer-threads'
import { assertSessions } from '@echo/firestore-test/session/assert-sessions'
import { assertSwaps } from '@echo/firestore-test/swap/assert-swaps'
import { assertUsers } from '@echo/firestore-test/user/assert-users'
import { assertWallets } from '@echo/firestore-test/wallet/assert-wallets'

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
