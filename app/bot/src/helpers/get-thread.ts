import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'
import { TextChannel } from 'discord.js'
import { isNil } from 'ramda'

export async function getThread(channel: TextChannel, threadId: string) {
  try {
    const thread = await channel.threads.fetch(threadId)
    if (isNil(thread)) {
      logger.error(`Thread ${threadId} in channel ${channel.id} not found`)
      return undefined
    }
    return thread
  } catch (e) {
    logger.error(`Thread ${threadId} in channel ${channel.id} not found: ${errorMessage(e)}`)
    return undefined
  }
}
