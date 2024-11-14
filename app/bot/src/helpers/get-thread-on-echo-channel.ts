import { getEchoChannel } from '@echo/bot/helpers/get-echo-channel'
import { getThread } from '@echo/bot/helpers/get-thread'
import { isNil } from 'ramda'

export async function getThreadOnEchoChannel(threadId: string) {
  const channel = await getEchoChannel()
  if (isNil(channel)) {
    return undefined
  }
  return getThread({ channel, threadId })
}
