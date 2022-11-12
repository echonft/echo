import { executeConnect } from '@commands/connect'
import { InputSubcommands } from '@commands/input-subcommands'
import { DiscordErrors, interactionReplyForError } from '@errors/errors'
import { CommandInteraction } from 'discord.js'

export async function executeForSubcommand(interaction: CommandInteraction, subcommand: InputSubcommands) {
  switch (subcommand) {
    case InputSubcommands.CONNECT:
      return executeConnect(interaction)
    default:
      return interaction.reply(interactionReplyForError(DiscordErrors.INVALID_COMMAND))
  }
}
