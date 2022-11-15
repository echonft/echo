import { executeConnect } from '@echo/bot/commands/connect'
import { InputSubcommands } from '@echo/bot/commands/input-subcommands'
import { DiscordErrors, interactionReplyForError } from '@echo/bot/errors/errors'
import { CommandInteraction } from 'discord.js'

export async function executeForSubcommand(interaction: CommandInteraction, subcommand: InputSubcommands) {
  switch (subcommand) {
    case InputSubcommands.CONNECT:
      return executeConnect(interaction)
    default:
      return interaction.reply(interactionReplyForError(DiscordErrors.INVALID_COMMAND))
  }
}
