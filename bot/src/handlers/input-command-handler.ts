import { executeConnect } from '../commands/connect'
import { executeCreateOffer } from '../commands/create-offer'
import { InvalidSubcommandError } from '../errors/invalid-subcommand-error'
import { NotConfiguredError } from '../errors/not-configured-error'
import { WrongChannelError } from '../errors/wrong-channel-error'
import { InputSubcommands } from '../types/commands/input-subcommands'
import { collection } from '@echo/firebase-admin'
import { errorMessage, logger } from '@echo/utils'
import { ChatInputCommandInteraction, CommandInteraction } from 'discord.js'
import { isEmpty, isNil } from 'rambda'

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
  return collection(guildId ?? '')
    .then((collection) => {
      if (isNil(collection)) {
        throw new NotConfiguredError(guildId)
      }
      const channelId = interaction.channelId
      if (channelId !== collection.channelId) {
        throw new WrongChannelError(guildId, channelId)
      }
      return executeForSubcommand(interaction, interaction.options.getSubcommand() as InputSubcommands)
    })
    .catch((error) => {
      logger.error(
        `Error fetching collection${isNil(guildId) || isEmpty(guildId) ? '' : ` for guild ${guildId}`}: ${errorMessage(
          error
        )}`
      )
      throw new NotConfiguredError(guildId)
    })
}
