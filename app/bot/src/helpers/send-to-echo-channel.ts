import { getEchoChannel } from '@echo/bot/helpers/get-echo-channel'
import { sendToChannel } from '@echo/bot/helpers/send-to-channel'
import type { WithLogger } from '@echo/utils/types/with-logger'
import type { Client, MessageCreateOptions, MessagePayload } from 'discord.js'
import { omit } from 'ramda'

interface SendToEchoChannelArgs extends WithLogger {
  client: Client
  payload: string | MessagePayload | MessageCreateOptions
}

export async function sendToEchoChannel(args: SendToEchoChannelArgs) {
  const channel = await getEchoChannel(omit(['payload'], args))
  return sendToChannel(channel, args.payload)
}
