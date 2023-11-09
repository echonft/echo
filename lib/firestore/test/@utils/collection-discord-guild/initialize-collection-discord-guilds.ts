import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { collectionDiscordGuildMock } from '@echo/firestore-mocks/collection-discord-guild/collection-discord-guild-mock'

export async function initializeCollectionDiscordGuilds() {
  const collectionDiscordGuilds = Object.values(collectionDiscordGuildMock)
  for (const collectionDiscordGuild of collectionDiscordGuilds) {
    await firestoreApp()
      .collection(CollectionReferenceName.COLLECTION_DISCORD_GUILDS)
      .doc(collectionDiscordGuild.id)
      .set(collectionDiscordGuild)
  }
}
