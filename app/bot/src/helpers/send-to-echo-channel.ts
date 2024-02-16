import { getEchoChannel } from '@echo/bot/get-echo-channel'
import { sendToChannel } from '@echo/bot/helpers/send-to-channel'
import type { MessageCreateOptions, MessagePayload } from 'discord.js'

export async function sendToEchoChannel(payload: string | MessagePayload | MessageCreateOptions) {
  const channel = await getEchoChannel()
  return sendToChannel(channel, payload)
}
