import { InteractionError } from '@echo/bot/errors/interaction-error'
import { executeForButton } from '@echo/bot/handlers/button-handler'
import { executeForCommand } from '@echo/bot/handlers/input-command-handler'
import { logger } from '@echo/utils/services/logger'
import { BaseInteraction } from 'discord.js'

export async function listenToInteractions(interaction: BaseInteraction) {
  if (interaction.isChatInputCommand()) {
    try {
      return executeForCommand(interaction)
    } catch (error) {
      logger.error(
        `Error executing command ${interaction.options.getSubcommand()}: ${(error as InteractionError).message}`
      )
      return (error as InteractionError).reply(interaction)
    }
  }
  if (interaction.isButton()) {
    try {
      return await executeForButton(interaction)
    } catch (error) {
      logger.error(`Error executing button ${interaction.customId}: ${(error as InteractionError).message}`)
      return (error as InteractionError).reply(interaction)
    }
  }
  return Promise.resolve()
}
