import { InputSubcommands } from '@commands/input-subcommands'
import { DiscordErrors, interactionReplyForError } from '@errors/errors'
import { executeForButton } from '@handlers/button-handler'
import { executeForSubcommand } from '@handlers/input-command-handler'
import { validateButton } from '@validators/button-validator'
import { validateCommand } from '@validators/command-validator'
import { BaseInteraction } from 'discord.js'
import { isNil } from 'ramda'

export async function listenToInteractions(interaction: BaseInteraction) {
  if (interaction.isChatInputCommand()) {
    if (await validateCommand(interaction)) {
      return executeForSubcommand(interaction, interaction.options.getSubcommand() as InputSubcommands)
    }
    return interaction.reply(interactionReplyForError(DiscordErrors.INVALID_COMMAND))
  }
  if (interaction.isButton()) {
    const customId = validateButton(interaction)
    if (!isNil(customId)) {
      return executeForButton(interaction, customId)
    }
    return interaction.reply(interactionReplyForError(DiscordErrors.INVALID_BUTTON))
  }
  return
}
