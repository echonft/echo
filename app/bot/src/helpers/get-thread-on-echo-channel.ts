import { getEchoChannel } from '@echo/bot/helpers/get-echo-channel'
import { getThread } from '@echo/bot/helpers/get-thread'
import type { Logger } from '@echo/utils/types/logger'
import type { Nullable } from '@echo/utils/types/nullable'
import { type Client } from 'discord.js'
import { isNil } from 'ramda'

interface GetThreadOnEchoChannelArgs {
  client: Client
  threadId: string
  logger?: Nullable<Logger>
}

export async function getThreadOnEchoChannel(args: GetThreadOnEchoChannelArgs) {
  const { client, threadId, logger } = args
  const channel = await getEchoChannel({ client, logger })
  if (isNil(channel)) {
    return undefined
  }
  return getThread({ channel, threadId, logger })
}
