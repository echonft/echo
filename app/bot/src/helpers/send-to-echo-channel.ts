import { getEchoChannel } from '@echo/bot/helpers/get-echo-channel'
import { sendToChannel } from '@echo/bot/helpers/send-to-channel'
import type { Client, MessageCreateOptions, MessagePayload } from 'discord.js'

interface SendToEchoChannelArgs {
  readonly client: Client
  readonly payload: string | MessagePayload | MessageCreateOptions
}

export async function sendToEchoChannel({ client, payload }: SendToEchoChannelArgs) {
  const channel = await getEchoChannel(client)
  return sendToChannel(channel, payload)
}
