import { getChannel } from '@echo/bot/helpers/get-channel'
import { getEchoDiscordGuild } from '@echo/utils/helpers/get-echo-discord-guild'
import type { WithLogger } from '@echo/utils/types/with-logger'
import type { Client, TextChannel } from 'discord.js'
import { assoc, pipe } from 'ramda'

interface GetEchoChannelArgs extends WithLogger {
  client: Client
}

export function getEchoChannel(args: GetEchoChannelArgs): Promise<TextChannel> {
  return pipe(assoc('channelId', getEchoDiscordGuild().channelId), getChannel)(args)
}
