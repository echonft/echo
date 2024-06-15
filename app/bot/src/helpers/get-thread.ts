import type { WithLogger } from '@echo/utils/types/with-logger'
import { TextChannel } from 'discord.js'
import { isNil } from 'ramda'

interface GetThreadArgs extends WithLogger {
  channel: TextChannel
  threadId: string
}

export async function getThread(args: GetThreadArgs) {
  const { channel, threadId, logger } = args
  try {
    const thread = await channel.threads.fetch(threadId)
    if (isNil(thread)) {
      return undefined
    }
    return thread
  } catch (err) {
    logger?.error({ err, channel }, `could not get thread ${threadId}`)
    return undefined
  }
}
