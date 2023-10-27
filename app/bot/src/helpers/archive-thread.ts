import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'
import type { AnyThreadChannel, ThreadChannel } from 'discord.js'

export async function archiveThread(thread: AnyThreadChannel<boolean> | ThreadChannel<boolean>) {
  try {
    await thread.setArchived(true)
  } catch (e) {
    logger.error(
      `Error archiving thread ${thread.id} in channel ${thread.parentId} in guild ${thread.guildId}: ${errorMessage(e)}`
    )
  }
}
