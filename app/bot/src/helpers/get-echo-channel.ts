import { getChannel } from '@echo/bot/helpers/get-channel'
import { echoDiscordGuild } from '@echo/utils/helpers/echo-discord-guild'
import type { TextChannel } from 'discord.js'
import { pipe, prop } from 'ramda'

export function getEchoChannel(): Promise<TextChannel> {
  return pipe(echoDiscordGuild, prop('channelId'), getChannel)()
}
