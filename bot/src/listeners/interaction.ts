import { InputSubcommands } from '@echo/bot/commands/input-subcommands'
import { DiscordErrors, interactionReplyForError } from '@echo/bot/errors/errors'
import { executeForButton } from '@echo/bot/handlers/button-handler'
import { executeForSubcommand } from '@echo/bot/handlers/input-command-handler'
import { validateButton } from '@echo/bot/validators/button-validator'
import { validateCommand } from '@echo/bot/validators/command-validator'
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
