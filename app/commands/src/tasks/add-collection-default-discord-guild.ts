import { addCollectionDiscordGuild } from '@echo/firestore/crud/collection-discord-guild/add-collection-discord-guild'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'

export async function addCollectionDefaultDiscordGuild(collectionId: string) {
  const guildId = process.env.ECHO_DISCORD_GUILD_ID
  if (isNilOrEmpty(guildId)) {
    throw Error('ECHO_DISCORD_GUILD_ID env var is not defined')
  }
  const channelId = process.env.ECHO_DISCORD_GUILD_CHANNEL_ID
  if (isNilOrEmpty(channelId)) {
    throw Error('ECHO_DISCORD_GUILD_CHANNEL_ID env var is not defined')
  }
  await addCollectionDiscordGuild(collectionId, guildId, channelId)
}
