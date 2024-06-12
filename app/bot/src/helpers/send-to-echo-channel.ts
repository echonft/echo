import { getEchoChannel } from '@echo/bot/helpers/get-echo-channel'
import { sendToChannel } from '@echo/bot/helpers/send-to-channel'
import type { Client, MessageCreateOptions, MessagePayload } from 'discord.js'

export async function sendToEchoChannel(client: Client, payload: string | MessagePayload | MessageCreateOptions) {
  const channel = await getEchoChannel(client)
  return sendToChannel(channel, payload)
}
