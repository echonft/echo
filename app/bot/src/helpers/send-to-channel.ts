import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'
import type { MessageCreateOptions, MessagePayload, TextChannel } from 'discord.js'

export async function sendToChannel(channel: TextChannel, payload: string | MessagePayload | MessageCreateOptions) {
  try {
    await channel.send(payload)
  } catch (e) {
    logger.error(`Error sending to channel ${channel.id} in guild ${channel.guildId}: ${errorMessage(e)}`)
  }
}
