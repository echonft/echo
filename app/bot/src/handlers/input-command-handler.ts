import { executeConnect } from '../commands/connect'
import { executeCreateListing } from '../commands/create-listing'
import { InvalidSubcommandError } from '../errors/invalid-subcommand-error'
import { NotConfiguredError } from '../errors/not-configured-error'
import { WrongChannelError } from '../errors/wrong-channel-error'
import { InputSubcommands } from '../types/commands/input-subcommands'
import { findDiscordGuildByGuildId } from '@echo/firebase-admin'
import { FirestoreDiscordGuildData } from '@echo/firestore'
import { andThenOtherwise, errorMessage, logger } from '@echo/utils'
import { ChatInputCommandInteraction, CommandInteraction, Message } from 'discord.js'
import { equals, ifElse, isEmpty, isNil, pipe, prop } from 'ramda'

function executeForSubcommand(interaction: CommandInteraction, subcommand: InputSubcommands) {
  switch (subcommand) {
    case InputSubcommands.CONNECT:
      return executeConnect(interaction)
    case InputSubcommands.CREATE_LISTING:
      return executeCreateListing(interaction)
    default:
      throw new InvalidSubcommandError(subcommand)
  }
}

export function executeForCommand(interaction: ChatInputCommandInteraction) {
  const guildId = interaction.guildId
  if (isNil(guildId) || isEmpty(guildId)) {
    throw new NotConfiguredError(guildId)
  }
  return pipe(
    findDiscordGuildByGuildId,
    andThenOtherwise(
      ifElse<[FirestoreDiscordGuildData], Promise<Message<boolean>>, never>(
        pipe(prop('channelId'), equals(interaction.channelId)),
        () => executeForSubcommand(interaction, interaction.options.getSubcommand() as InputSubcommands),
        (discordGuild: FirestoreDiscordGuildData) => {
          throw new WrongChannelError(guildId, discordGuild.channelId)
        }
      ),
      (error) => {
        logger.error(
          `Error fetching collection${
            isNil(guildId) || isEmpty(guildId) ? '' : ` for guild ${guildId}`
          }: ${errorMessage(error)}`
        )
        throw new NotConfiguredError(guildId)
      }
    )
  )(guildId)
}
