import { InvalidChannelIdError } from '../errors/invalid-channel-id-error'
import { Client, TextChannel } from 'discord.js'
import { isNil } from 'ramda'

export function getDiscordChannel(client: Client, channelId: string): TextChannel {
  const channel = client.channels.cache.get(channelId)
  if (isNil(channel)) {
    throw new InvalidChannelIdError(channelId)
  }
  return channel as TextChannel
}
