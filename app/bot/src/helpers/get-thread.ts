import type { Logger } from '@echo/utils/types/logger'
import type { Nullable } from '@echo/utils/types/nullable'
import { TextChannel } from 'discord.js'
import { isNil } from 'ramda'

interface GetThreadArgs {
  channel: TextChannel
  threadId: string
  logger?: Nullable<Logger>
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
