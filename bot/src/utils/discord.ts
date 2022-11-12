import { Client, TextChannel } from 'discord.js'

export function getDiscordChannel(client: Client, channelId: string): TextChannel | undefined {
  return client.channels.cache.get(channelId) as TextChannel
}
