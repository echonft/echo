import { buttonIdPrefixes } from '@echo/bot/models/button-action'
import { ButtonComponent, ButtonInteraction } from 'discord.js'

export function validateButton(interaction: ButtonInteraction): string | undefined {
  const customId = (interaction.component as ButtonComponent).customId
  return isCustomIdValid(customId) ? customId! : undefined
}

function isCustomIdValid(customId: string | null): boolean {
  return buttonIdPrefixes.some((prefix) => customId?.startsWith(prefix))
}
