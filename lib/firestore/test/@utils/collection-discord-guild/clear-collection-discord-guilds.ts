import { deleteCollectionDiscordGuild } from '@echo/firestore-test/collection-discord-guild/delete-collection-discord-guild'
import { getAllCollectionDiscordGuilds } from '@echo/firestore-test/collection-discord-guild/get-all-collection-discord-guilds'

export async function clearCollectionDiscordGuilds() {
  const collectionDiscordGuilds = await getAllCollectionDiscordGuilds()
  for (const collectionDiscordGuild of collectionDiscordGuilds) {
    try {
      await deleteCollectionDiscordGuild(collectionDiscordGuild.id)
    } catch (e) {
      // nothing to do
    }
  }
}
