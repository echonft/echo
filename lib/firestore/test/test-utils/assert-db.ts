import { assertDiscordUsers } from '@test-utils/discord-user/assert-discord-users'
import { assertListings } from '@test-utils/listing/assert-listings'
import { assertNfts } from '@test-utils/nft/assert-nfts'
import { assertNftCollections } from '@test-utils/nft-collection/assert-nft-collections'
import { assertNftCollectionDiscordGuilds } from '@test-utils/nft-collection-discord-guild/assert-nft-collection-discord-guilds'
import { assertOffers } from '@test-utils/offer/assert-offers'
import { assertSessions } from '@test-utils/session/assert-sessions'
import { assertSwaps } from '@test-utils/swap/assert-swaps'
import { assertUsers } from '@test-utils/user/assert-users'
import { assertWallets } from '@test-utils/wallet/assert-wallets'

export async function assertDb() {
  await assertDiscordUsers()
  await assertListings()
  await assertNftCollections()
  await assertNftCollectionDiscordGuilds()
  await assertNfts()
  await assertOffers()
  await assertSessions()
  await assertSwaps()
  await assertUsers()
  await assertWallets()
}
