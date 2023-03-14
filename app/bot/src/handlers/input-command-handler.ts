import { executeConnect } from '../commands/connect'
import { executeCreateOffer } from '../commands/create-offer'
import { InvalidSubcommandError } from '../errors/invalid-subcommand-error'
import { NotConfiguredError } from '../errors/not-configured-error'
import { WrongChannelError } from '../errors/wrong-channel-error'
import { InputSubcommands } from '../types/commands/input-subcommands'
import { findDiscordGuildById } from '@echo/firebase-admin'
import { DiscordGuild } from '@echo/model'
import { errorMessage, logger } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { ChatInputCommandInteraction, CommandInteraction, InteractionResponse } from 'discord.js'
import { andThen, equals, ifElse, isEmpty, isNil, pipe, prop } from 'ramda'

function executeForSubcommand(interaction: CommandInteraction, subcommand: InputSubcommands) {
  switch (subcommand) {
    case InputSubcommands.CONNECT:
      return executeConnect(interaction)
    case InputSubcommands.CREATE_OFFER:
      return executeCreateOffer(interaction)
    default:
      throw new InvalidSubcommandError(subcommand)
  }
}

export function executeForCommand(interaction: ChatInputCommandInteraction) {
  const guildId = interaction.guildId
  if (isNil(guildId) || isEmpty(guildId)) {
    return
  }
  return pipe(
    findDiscordGuildById,
    andThen(
      pipe(
        R.tapError((error) => {
          logger.error(
            `Error fetching collection${
              isNil(guildId) || isEmpty(guildId) ? '' : ` for guild ${guildId}`
            }: ${errorMessage(error)}`
          )
          throw new NotConfiguredError(guildId)
        }),
        R.getExn,
        ifElse<[DiscordGuild], Promise<InteractionResponse<boolean>>, never>(
          pipe(prop('channelId'), equals(interaction.channelId)),
          (_discordGuild) => executeForSubcommand(interaction, interaction.options.getSubcommand() as InputSubcommands),
          (discordGuild) => {
            throw new WrongChannelError(guildId, discordGuild.channelId)
          }
        )
      )
    )
  )(guildId)
}
