import { InteractionError } from '../errors/interaction-error'
import { executeForButton } from '../handlers/button-handler'
import { executeForCommand } from '../handlers/input-command-handler'
import { BaseInteraction } from 'discord.js'

export function listenToInteractions(interaction: BaseInteraction) {
  if (interaction.isChatInputCommand()) {
    try {
      return executeForCommand(interaction)
    } catch (error) {
      return (error as InteractionError).reply(interaction)
    }
  }
  if (interaction.isButton()) {
    try {
      return executeForButton(interaction)
    } catch (error) {
      return (error as InteractionError).reply(interaction)
    }
  }
  return Promise.resolve()
}
