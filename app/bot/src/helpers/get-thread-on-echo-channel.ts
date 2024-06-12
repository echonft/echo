import { getEchoChannel } from '@echo/bot/helpers/get-echo-channel'
import { getThread } from '@echo/bot/helpers/get-thread'
import type { WithLogger } from '@echo/utils/types/with-logger'
import { type Client } from 'discord.js'
import { isNil } from 'ramda'

interface GetThreadOnEchoChannelArgs extends WithLogger {
  client: Client
  threadId: string
}

export async function getThreadOnEchoChannel(args: GetThreadOnEchoChannelArgs) {
  const { client, threadId, logger } = args
  const channel = await getEchoChannel({ client, logger })
  if (isNil(channel)) {
    return undefined
  }
  return getThread({ channel, threadId, logger })
}
