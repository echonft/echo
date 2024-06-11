import { getEchoChannel } from '@echo/bot/helpers/get-echo-channel'
import { getThread } from '@echo/bot/helpers/get-thread'

export async function getThreadOnEchoChannel(threadId: string) {
  const channel = await getEchoChannel()
  return getThread(channel, threadId)
}
