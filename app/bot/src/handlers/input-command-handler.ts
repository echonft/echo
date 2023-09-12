import { executeConnect } from '../commands/connect'
import { executeCreateListing } from '../commands/create-listing'
import { InvalidSubcommandError } from '../errors/invalid-subcommand-error'
import { NotConfiguredError } from '../errors/not-configured-error'
import { WrongChannelError } from '../errors/wrong-channel-error'
import { InputSubcommands } from '../types/commands/input-subcommands'
import { findNftCollectionByDiscordGuildDiscordId } from '@echo/firestore'
import { NftCollection } from '@echo/firestore-types'
import errorMessage from '@echo/utils/error-message'
import logger from '@echo/utils/logger'
import { ChatInputCommandInteraction, CommandInteraction } from 'discord.js'
import { isEmpty, isNil } from 'ramda'

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

export async function executeForCommand(interaction: ChatInputCommandInteraction) {
  const guildId = interaction.guildId
  if (isNil(guildId) || isEmpty(guildId)) {
    throw new NotConfiguredError(guildId)
  }
  let collection: NftCollection | undefined
  try {
    collection = await findNftCollectionByDiscordGuildDiscordId(guildId)
  } catch (error) {
    logger.error(
      `Error fetching collection${isNil(guildId) || isEmpty(guildId) ? '' : ` for guild ${guildId}`}: ${errorMessage(
        error
      )}`
    )
    throw new NotConfiguredError(guildId)
  }
  if (isNil(collection)) {
    throw new NotConfiguredError(guildId)
  }
  if (collection.discordGuild.channelId !== guildId) {
    throw new WrongChannelError(guildId, collection.discordGuild.channelId)
  }
  await executeForSubcommand(interaction, interaction.options.getSubcommand() as InputSubcommands)
}
