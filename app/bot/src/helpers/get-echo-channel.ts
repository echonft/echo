import { getChannel } from '@echo/bot/helpers/get-channel'
import { echoDiscordGuild } from '@echo/utils/helpers/echo-discord-guild'
import type { Client, TextChannel } from 'discord.js'
import { assoc, pipe } from 'ramda'

export function getEchoChannel(client: Client): Promise<TextChannel> {
  return pipe(assoc('channelId', echoDiscordGuild().channelId), getChannel)(client)
}
