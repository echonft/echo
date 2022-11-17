import { ButtonComponent, ButtonInteraction } from 'discord.js'
import { buttonIdPrefixes } from 'models/button-action'

export function validateButton(interaction: ButtonInteraction): string | undefined {
  const customId = (interaction.component as ButtonComponent).customId
  return isCustomIdValid(customId) ? customId! : undefined
}

function isCustomIdValid(customId: string | null): boolean {
  return buttonIdPrefixes.some((prefix) => customId?.startsWith(prefix))
}
