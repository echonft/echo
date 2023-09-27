import { assertDiscordUsers } from '@test-utils/discord-user/assert-discord-users'
import { assertListings } from '@test-utils/listing/assert-listings'
import { assertListingOffers } from '@test-utils/listing-offer/assert-listing-offers'
import { assertListingPosts } from '@test-utils/listing-post/assert-listing-posts'
import { assertNfts } from '@test-utils/nft/assert-nfts'
import { assertNftCollections } from '@test-utils/nft-collection/assert-nft-collections'
import { assertNftCollectionDiscordGuilds } from '@test-utils/nft-collection-discord-guild/assert-nft-collection-discord-guilds'
import { assertNftCollectionSwapsCounts } from '@test-utils/nft-collection-swaps-count/assert-nft-collection-swaps-counts'
import { assertOffers } from '@test-utils/offer/assert-offers'
import { assertOfferPosts } from '@test-utils/offer-post/assert-offer-posts'
import { assertSessions } from '@test-utils/session/assert-sessions'
import { assertSwaps } from '@test-utils/swap/assert-swaps'
import { assertUsers } from '@test-utils/user/assert-users'
import { assertWallets } from '@test-utils/wallet/assert-wallets'

export async function assertDb() {
  await assertDiscordUsers()
  await assertListings()
  await assertListingOffers()
  await assertListingPosts()
  await assertNftCollections()
  await assertNftCollectionDiscordGuilds()
  await assertNftCollectionSwapsCounts()
  await assertNfts()
  await assertOffers()
  await assertOfferPosts()
  await assertSessions()
  await assertSwaps()
  await assertUsers()
  await assertWallets()
}
