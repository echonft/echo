import { executeConnect } from '@echo/bot/commands/connect'
import { executeCreateListing } from '@echo/bot/commands/create-listing'
import { InvalidSubcommandError } from '@echo/bot/errors/invalid-subcommand-error'
import { NotConfiguredError } from '@echo/bot/errors/not-configured-error'
import { InputSubcommands } from '@echo/bot/types/commands/input-subcommands'
import { findNftCollectionByDiscordGuildDiscordId } from '@echo/firestore/crud/nft-collection-discord-guild/find-nft-collection-by-discord-guild-discord-id'
import type { Collection } from '@echo/model/types/collection'
import { errorMessage } from '@echo/utils/error/error-message'
import { logger } from '@echo/utils/services/logger'
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
  let collection: Collection | undefined
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
  // if (collection.discordGuild.channelId !== guildId) {
  //   throw new WrongChannelError(guildId, collection.discordGuild.channelId)
  // }
  await executeForSubcommand(interaction, interaction.options.getSubcommand() as InputSubcommands)
}
