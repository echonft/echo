import { deleteNftCollectionDiscordGuild } from '@echo/firestore/crud/nft-collection-discord-guild/delete-nft-collection-discord-guild'
import { getAllNftCollectionDiscordGuilds } from '@echo/firestore/crud/nft-collection-discord-guild/get-all-nft-collection-discord-guilds'

export async function clearNftCollectionDiscordGuilds() {
  const nftCollectionDiscordGuilds = await getAllNftCollectionDiscordGuilds()
  for (const nftCollectionDiscordGuild of nftCollectionDiscordGuilds) {
    try {
      await deleteNftCollectionDiscordGuild(nftCollectionDiscordGuild.id)
    } catch (e) {
      // nothing to do
    }
  }
}
