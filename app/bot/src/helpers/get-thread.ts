import { TextChannel } from 'discord.js'
import { isNil } from 'ramda'

interface GetThreadArgs {
  readonly channel: TextChannel
  readonly threadId: string
}

export async function getThread({ channel, threadId }: GetThreadArgs) {
  try {
    const thread = await channel.threads.fetch(threadId)
    if (isNil(thread)) {
      return undefined
    }
    return thread
  } catch (err) {
    logger.error({ err, channel: { id: channel.id }, thread: { id: threadId } }, 'could not get thread')
    return undefined
  }
}
