import { getChannel } from '@echo/bot/helpers/get-channel'
import { getEchoDiscordGuild } from '@echo/utils/helpers/get-echo-discord-guild'
import type { Logger } from '@echo/utils/types/logger'
import type { Nullable } from '@echo/utils/types/nullable'
import type { Client, TextChannel } from 'discord.js'
import { assoc, pipe } from 'ramda'

interface GetEchoChannelArgs {
  client: Client
  logger?: Nullable<Logger>
}

export function getEchoChannel(args: GetEchoChannelArgs): Promise<TextChannel> {
  return pipe(assoc('channelId', getEchoDiscordGuild().channelId), getChannel)(args)
}
