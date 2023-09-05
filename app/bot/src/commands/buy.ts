import { BuyOwnListingError } from '../errors/buy-own-listing-error'
import { getDiscordChannel } from '../helpers/get-discord-channel'
import { OfferComplete } from '@echo/firestore-types'
import { errorMessage, logger } from '@echo/utils'
import { ButtonInteraction, ChannelType } from 'discord.js'

// TODO Might be renamed here if we go for listings and offers
export function executeBuy(interaction: ButtonInteraction, offer: OfferComplete) {
  if (offer.sender.discordId === interaction.user.id) {
    throw new BuyOwnListingError(offer.id)
  }
  // TODO This will need some cleaning
  return getDiscordChannel(interaction.client, interaction.channelId).then((channel) => {
    return channel.threads
      .create({
        name: `Buy offer for ${offer.id}`,
        autoArchiveDuration: 1440,
        type: ChannelType.PrivateThread,
        reason: 'Thread to discuss the offer'
      })
      .then((thread) => {
        thread.members
          .add(offer.sender.discordId)
          .then(() => {
            thread.members
              .add(interaction.user)
              .then(() =>
                interaction.reply({
                  ephemeral: true,
                  content: 'Created a thread to discuss the offer'
                })
              )
              .catch((error) => {
                logger.error(`Error creating thread: ${errorMessage(error)}`)
                return interaction.reply({
                  ephemeral: true,
                  content: 'Error creating a thread to discuss the offer'
                })
              })
          })
          .catch((error) => {
            logger.error(`Error creating thread: ${errorMessage(error)}`)
            return interaction.reply({
              ephemeral: true,
              content: 'Error creating a thread to discuss the offer'
            })
          })
      })
      .catch((error) => {
        logger.error(`Error creating thread: ${errorMessage(error)}`)
        return interaction.reply({ ephemeral: true, content: 'Error creating a thread to discuss the offer' })
      })
  })
}
