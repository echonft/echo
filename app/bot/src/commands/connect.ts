import { NoGuildIdError } from '../errors/no-guild-id-error'
import { loginLink } from '../routing/login-link'
import { findDiscordGuildByGuildId } from '@echo/firebase-admin'
import { R } from '@mobily/ts-belt'
import { CommandInteraction, SlashCommandSubcommandBuilder } from 'discord.js'
import { isNil } from 'ramda'

/**
 * Connect command
 * @param subCommand The builder
 * @return SlashCommandSubcommandBuilder
 */
export const connectSubcommand = (subCommand: SlashCommandSubcommandBuilder) =>
  subCommand.setName('connect').setDescription('Connect to the bot via Discord and Wallet')

export function executeConnect(interaction: CommandInteraction) {
  const noGuildErrorReplyOptions = new NoGuildIdError().getInteractionReplyOptions()
  if (isNil(interaction.guildId)) {
    return interaction.reply(noGuildErrorReplyOptions)
  }
  return findDiscordGuildByGuildId(interaction.guildId).then((guildResult) => {
    if (R.isOk(guildResult)) {
      return interaction.reply({
        content: loginLink(R.getExn(guildResult).id),
        ephemeral: true
      })
    }
    return interaction.reply(noGuildErrorReplyOptions)
  })
}
