import { clearDiscordUsers } from '@test-utils/discord-user/clear-discord-users'
import { clearListings } from '@test-utils/listing/clear-listings'
import { clearNfts } from '@test-utils/nft/clear-nfts'
import { clearNftCollections } from '@test-utils/nft-collection/clear-nft-collections'
import { clearNftCollectionDiscordGuilds } from '@test-utils/nft-collection-discord-guild/clear-nft-collection-discord-guilds'
import { clearOffers } from '@test-utils/offer/clear-offers'
import { clearSessions } from '@test-utils/session/clear-sessions'
import { clearSwaps } from '@test-utils/swap/clear-swaps'
import { clearUsers } from '@test-utils/user/clear-users'
import { clearWallets } from '@test-utils/wallet/clear-wallets'

export async function clearDb() {
  await clearDiscordUsers()
  await clearListings()
  await clearNftCollections()
  await clearNftCollectionDiscordGuilds()
  await clearNfts()
  await clearOffers()
  await clearSessions()
  await clearSwaps()
  await clearUsers()
  await clearWallets()
}
