import { InteractionError } from '@echo/bot/errors/interaction-error'
import { executeForButton } from '@echo/bot/helpers/button/execute-for-button'
import { captureException } from '@sentry/node'
import { BaseInteraction } from 'discord.js'

export function listenToInteractions(interaction: BaseInteraction) {
  if (interaction.isButton()) {
    try {
      return executeForButton(interaction)
    } catch (error) {
      captureException(error)
      return void (error as InteractionError).reply(interaction)
    }
  }
}
