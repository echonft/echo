import { executeConnect } from 'commands/connect'
import { InputSubcommands } from 'commands/input-subcommands'
import { CommandInteraction } from 'discord.js'
import { DiscordErrors, interactionReplyForError } from 'errors/errors'

export async function executeForSubcommand(interaction: CommandInteraction, subcommand: InputSubcommands) {
  switch (subcommand) {
    case InputSubcommands.CONNECT:
      return executeConnect(interaction)
    default:
      return interaction.reply(interactionReplyForError(DiscordErrors.INVALID_COMMAND))
  }
}
