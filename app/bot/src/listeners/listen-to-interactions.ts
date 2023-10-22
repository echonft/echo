import { InteractionError } from '@echo/bot/errors/interaction-error'
import { executeForButton } from '@echo/bot/handlers/button-handler'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'
import { BaseInteraction } from 'discord.js'

export function listenToInteractions(interaction: BaseInteraction) {
  if (interaction.isButton()) {
    try {
      return executeForButton(interaction)
    } catch (error) {
      logger.error(`Error executing button ${interaction.customId}: ${errorMessage(error)}`)
      return (error as InteractionError).reply(interaction)
    }
  }
  return Promise.resolve()
}
