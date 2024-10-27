import { TextChannel } from 'discord.js'
import { isNil } from 'ramda'

interface GetThreadArgs {
  readonly channel: TextChannel
  readonly threadId: string
}

export async function getThread(args: GetThreadArgs) {
  const { channel, threadId } = args
  try {
    const thread = await channel.threads.fetch(threadId)
    if (isNil(thread)) {
      return undefined
    }
    return thread
  } catch (err) {
    logger.error({ err, channel }, `could not get thread ${threadId}`)
    return undefined
  }
}
