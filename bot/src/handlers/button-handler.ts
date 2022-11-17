import { executeBuy } from 'commands/buy'
import { ButtonInteraction } from 'discord.js'
import { DiscordErrors, interactionReplyForError } from 'errors/errors'
import { ButtonAction } from 'models/button-action'
import { parseButtonCustomId } from 'parsers/button-id-parser'
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
