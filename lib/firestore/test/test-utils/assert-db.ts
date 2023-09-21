import { assertDiscordUsers } from '@test-utils/discord-user/assert-discord-users'
import { assertListings } from '@test-utils/listing/assert-listings'
import { assertNfts } from '@test-utils/nft/assert-nfts'
import { assertNftCollections } from '@test-utils/nft-collection/assert-nft-collections'
import { assertNftCollectionDiscordGuilds } from '@test-utils/nft-collection-discord-guild/assert-nft-collection-discord-guilds'
import { assertOffers } from '@test-utils/offer/assert-offers'
import { assertSessions } from '@test-utils/session/assert-sessions'
import { assertUsers } from '@test-utils/user/assert-users'
import { assertWallets } from '@test-utils/wallet/assert-wallets'

export async function assertDb() {
  await assertDiscordUsers()
  await assertListings()
  await assertNftCollections()
  await assertNfts()
  await assertOffers()
  await assertSessions()
  await assertUsers()
  await assertNftCollectionDiscordGuilds()
  await assertWallets()
}
