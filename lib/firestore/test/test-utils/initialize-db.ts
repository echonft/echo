import { initializeDiscordUsers } from '@test-utils/discord-user/initialize-discord-users'
import { initializeListings } from '@test-utils/listing/initialize-listings'
import { initializeNfts } from '@test-utils/nft/initialize-nfts'
import { initializeNftCollections } from '@test-utils/nft-collection/initialize-nft-collections'
import { initializeNftCollectionDiscordGuilds } from '@test-utils/nft-collection-discord-guild/initialize-nft-collection-discord-guilds'
import { initializeOffers } from '@test-utils/offer/initialize-offers'
import { initializeSessions } from '@test-utils/session/initialize-sessions'
import { initializeSwaps } from '@test-utils/swap/initialize-swaps'
import { initializeUsers } from '@test-utils/user/initialize-users'
import { initializeWallets } from '@test-utils/wallet/initialize-wallets'

export async function initializeDb() {
  await initializeDiscordUsers()
  await initializeListings()
  await initializeNftCollections()
  await initializeNftCollectionDiscordGuilds()
  await initializeNfts()
  await initializeOffers()
  await initializeSessions()
  await initializeSwaps()
  await initializeUsers()
  await initializeWallets()
}
