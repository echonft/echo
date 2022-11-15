import { executeBuy } from '@echo/bot/commands/buy'
import { DiscordErrors, interactionReplyForError } from '@echo/bot/errors/errors'
import { ButtonAction } from '@echo/bot/models/button-action'
import { parseButtonCustomId } from '@echo/bot/parsers/button-id-parser'
import { ButtonInteraction } from 'discord.js'
import { isNil } from 'ramda'

export async function executeForButton(interaction: ButtonInteraction, customId: string) {
  const parsedData = await parseButtonCustomId(customId)
  if (isNil(parsedData)) {
    return interaction.reply(interactionReplyForError(DiscordErrors.INVALID_BUTTON))
  }
  switch (parsedData?.action) {
    case ButtonAction.BUY:
      if (isNil(parsedData.offer)) {
        return interaction.reply(interactionReplyForError(DiscordErrors.OFFER_NOT_FOUND))
      }
      return await executeBuy(interaction, parsedData.offer)
    default:
      return interaction.reply(interactionReplyForError(DiscordErrors.INVALID_BUTTON))
  }
}
