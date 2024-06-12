import { getEchoChannel } from '@echo/bot/helpers/get-echo-channel'
import { sendToChannel } from '@echo/bot/helpers/send-to-channel'
import type { Logger } from '@echo/utils/types/logger'
import type { Nullable } from '@echo/utils/types/nullable'
import type { Client, MessageCreateOptions, MessagePayload } from 'discord.js'
import { omit } from 'ramda'

interface SendToEchoChannelArgs {
  client: Client
  payload: string | MessagePayload | MessageCreateOptions
  logger?: Nullable<Logger>
}

export async function sendToEchoChannel(args: SendToEchoChannelArgs) {
  const channel = await getEchoChannel(omit(['payload'], args))
  return sendToChannel(channel, args.payload)
}
