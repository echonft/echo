import { NoGuildIdError } from '../errors/no-guild-id-error'
import { loginLink } from '../routing/login-link'
import { findDiscordGuildByGuildId } from '@echo/firestore'
import { andThenOtherwise, isNilOrEmpty } from '@echo/utils'
import { CommandInteraction, SlashCommandSubcommandBuilder } from 'discord.js'
import { andThen, ifElse, pipe, prop } from 'ramda'

/**
 * Connect command
 * @param subCommand The builder
 * @return SlashCommandSubcommandBuilder
 */
export const connectSubcommand = (subCommand: SlashCommandSubcommandBuilder) =>
  subCommand.setName('connect').setDescription('Connect to the bot via Discord and Wallet')

export function executeConnect(interaction: CommandInteraction) {
  return ifElse(
    pipe(prop('guildId'), isNilOrEmpty),
    () => {
      throw new NoGuildIdError()
    },
    pipe(
      (interaction: CommandInteraction) => interaction.deferReply({ ephemeral: true }).then(() => interaction),
      andThen(
        pipe(
          prop<string>('guildId'),
          findDiscordGuildByGuildId,
          andThenOtherwise(
            (guild) => {
              return interaction.editReply({
                content: loginLink(guild.id)
              })
            },
            () => interaction.editReply({ content: new NoGuildIdError().message })
          )
        )
      )
    )
  )(interaction)
}
