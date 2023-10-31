import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'
import type { AnyThreadChannel, MessageCreateOptions, MessagePayload, ThreadChannel } from 'discord.js'

export async function sendToThread(
  thread: AnyThreadChannel<boolean> | ThreadChannel<boolean>,
  payload: string | MessagePayload | MessageCreateOptions
) {
  try {
    await thread.send(payload)
  } catch (e) {
    logger.error(
      `Error sending to thread ${thread.id} in channel ${thread.parentId} in guild ${thread.guildId}: ${errorMessage(
        e
      )}`
    )
  }
}
