import { getEchoChannel } from '@echo/bot/helpers/get-echo-channel'
import { getThread } from '@echo/bot/helpers/get-thread'
import type { Client } from 'discord.js'

export async function getThreadOnEchoChannel(client: Client, threadId: string) {
  const channel = await getEchoChannel(client)
  return getThread(channel, threadId)
}
