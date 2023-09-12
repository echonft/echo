import { InteractionError } from '../errors/interaction-error'
import { executeForButton } from '../handlers/button-handler'
import { executeForCommand } from '../handlers/input-command-handler'
import logger from '@echo/utils/logger'
import { BaseInteraction } from 'discord.js'

export function listenToInteractions(interaction: BaseInteraction) {
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
      return executeForButton(interaction)
    } catch (error) {
      logger.error(`Error executing button ${interaction.customId}: ${(error as InteractionError).message}`)
      return (error as InteractionError).reply(interaction)
    }
  }
  return Promise.resolve()
}
