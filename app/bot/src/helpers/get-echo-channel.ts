import { getChannel } from '@echo/bot/helpers/get-channel'
import { getEchoDiscordGuild } from '@echo/utils/helpers/get-echo-discord-guild'
import type { Client } from 'discord.js'
import { partial, pipe, prop } from 'ramda'

export function getEchoChannel(client: Client) {
  return pipe(getEchoDiscordGuild, prop('channelId'), partial(getChannel, [client]))()
}
