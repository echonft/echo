import { logger } from '@echo/utils/services/logger'
import {
  CommandInteraction,
  type InteractionReplyOptions,
  InteractionResponse,
  MessageComponentInteraction
} from 'discord.js'

export class InteractionError extends Error {
  getInteractionReplyOptions(): InteractionReplyOptions {
    throw Error('Method getInteractionReplyOptions() has to be implemented')
  }

  reply(interaction: CommandInteraction | MessageComponentInteraction): Promise<InteractionResponse> {
    logger.error(this.message)
    return interaction.reply(this.getInteractionReplyOptions())
  }
}
