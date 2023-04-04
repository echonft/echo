import { NoGuildIdError } from '../errors/no-guild-id-error'
import { loginLink } from '../routing/login-link'
import { findDiscordGuildByGuildId } from '@echo/firebase-admin'
import { isNilOrEmpty } from '@echo/utils'
import { R } from '@mobily/ts-belt'
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
    (interaction: CommandInteraction) => new NoGuildIdError().reply(interaction),
    pipe(
      prop('guildId'),
      findDiscordGuildByGuildId,
      andThen(
        ifElse(
          R.isOk,
          pipe(R.getExn, (guild) =>
            interaction.reply({
              content: loginLink(guild.id),
              ephemeral: true
            })
          ),
          () => new NoGuildIdError().reply(interaction)
        )
      )
    )
  )(interaction)
}
