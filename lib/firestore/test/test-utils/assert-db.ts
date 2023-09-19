import { assertDiscordUsers } from '@test-utils/assert-discord-users'
import { assertListings } from '@test-utils/assert-listings'
import { assertNftCollections } from '@test-utils/assert-nft-collections'
import { assertNfts } from '@test-utils/assert-nfts'
import { assertOffers } from '@test-utils/assert-offers'
import { assertSessions } from '@test-utils/assert-sessions'
import { assertUsers } from '@test-utils/assert-users'
import { assertWallets } from '@test-utils/assert-wallets'

export async function assertDb() {
  await assertDiscordUsers()
  await assertListings()
  await assertNftCollections()
  await assertNfts()
  await assertOffers()
  await assertSessions()
  await assertUsers()
  // await assertUserDiscordGuilds()
  await assertWallets()
}
