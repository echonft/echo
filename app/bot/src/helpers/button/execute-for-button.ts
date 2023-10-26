import { InvalidButtonActionError } from '@echo/bot/errors/invalid-button-action-error'
import { getButtonAction } from '@echo/bot/helpers/button/get-button-action'
import { splitButtonId } from '@echo/bot/helpers/button/split-button-id'
import { ButtonComponent, ButtonInteraction } from 'discord.js'

export function executeForButton(interaction: ButtonInteraction) {
  const customId = (interaction.component as ButtonComponent).customId
  const splitId = splitButtonId(customId)
  const action = getButtonAction(splitId)
  switch (action) {
    case 'reject':
      // TODO
      throw new InvalidButtonActionError(action)
    default:
      throw new InvalidButtonActionError(action)
  }
}
