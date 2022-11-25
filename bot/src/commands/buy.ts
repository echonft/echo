import { BuyOwnOfferError } from '../errors/buy-own-offer-error'
import { getDiscordChannel } from '../utils/discord'
import { Offer } from '@echo/model/offer'
import { errorMessage } from '@echo/utils/error'
import { logger } from '@echo/utils/logger'
import { ButtonInteraction, ChannelType } from 'discord.js'

export function executeBuy(interaction: ButtonInteraction, offer: Offer) {
  if (offer.owner.discordId === interaction.user.id) {
    throw new BuyOwnOfferError(offer.id)
  }
  const channel = getDiscordChannel(interaction.client, interaction.channelId)
  return channel.threads
    .create({
      name: `Buy offer for ${offer.id}`,
      autoArchiveDuration: 1440,
      type: ChannelType.PrivateThread,
      reason: 'Thread to discuss the offer'
    })
    .then((thread) => {
      thread.members
        .add(offer.owner.discordId)
        .then(() => {
          thread.members
            .add(interaction.user)
            .then(() => interaction.reply({ ephemeral: true, content: 'Created a thread to discuss the offer' }))
            .catch((error) => {
              logger.error(`Error creating thread: ${errorMessage(error)}`)
              return interaction.reply({ ephemeral: true, content: 'Error creating a thread to discuss the offer' })
            })
        })
        .catch((error) => {
          logger.error(`Error creating thread: ${errorMessage(error)}`)
          return interaction.reply({ ephemeral: true, content: 'Error creating a thread to discuss the offer' })
        })
    })
    .catch((error) => {
      logger.error(`Error creating thread: ${errorMessage(error)}`)
      return interaction.reply({ ephemeral: true, content: 'Error creating a thread to discuss the offer' })
    })
}
