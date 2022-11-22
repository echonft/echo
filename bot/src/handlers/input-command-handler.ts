import { executeConnect } from '../commands/connect'
import { InputSubcommands } from '../commands/input-subcommands'
import { InvalidSubcommandError } from '../errors/invalid-subcommand-error'
import { NotConfiguredError } from '../errors/not-configured-error'
import { WrongChannelError } from '../errors/wrong-channel-error'
import { getCollection } from '@echo/firebase-admin/getters/get-collection'
import { ChatInputCommandInteraction, CommandInteraction } from 'discord.js'
import { isNil } from 'ramda'

function executeForSubcommand(interaction: CommandInteraction, subcommand: InputSubcommands) {
  switch (subcommand) {
    case InputSubcommands.CONNECT:
      return executeConnect(interaction)
    default:
      throw new InvalidSubcommandError(subcommand)
  }
}

export function executeForCommand(interaction: ChatInputCommandInteraction) {
  const guildId = interaction.guildId
  return getCollection(guildId ?? '')
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
      console.error(`Error fetching collection ${guildId}: ${(error as Error).message}`)
      throw new NotConfiguredError(guildId)
    })
}
