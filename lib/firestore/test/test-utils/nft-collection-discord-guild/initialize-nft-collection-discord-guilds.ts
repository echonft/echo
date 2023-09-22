import { CollectionName } from '@echo/firestore/constants/collection-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { nftCollectionDiscordGuildMock } from '@echo/firestore-mocks/nft-collection-discord-guild/nft-collection-discord-guild-mock'

export async function initializeNftCollectionDiscordGuilds() {
  const nftCollectionDiscordGuilds = Object.values(nftCollectionDiscordGuildMock)
  for (const nftCollectionDiscordGuild of nftCollectionDiscordGuilds) {
    await firestoreApp()
      .collection(CollectionName.NFT_COLLECTION_DISCORD_GUILDS)
      .doc(nftCollectionDiscordGuild.id)
      .set(nftCollectionDiscordGuild)
  }
}
