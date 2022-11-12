import { Offer } from '@echo/model/src/offer'
import { DiscordErrors, interactionReplyForError } from '@errors/errors'
import { ButtonInteraction, ChannelType } from 'discord.js'
import { getDiscordChannel } from 'src/utils/discord'

export async function executeBuy(interaction: ButtonInteraction, offer: Offer) {
  if (offer.seller.discordId === interaction.user.id) {
    await interaction.reply(interactionReplyForError(DiscordErrors.BUY_OWN))
    return
  }
  const channel = getDiscordChannel(interaction.client, interaction.channelId)
  const thread = await channel?.threads.create({
    name: `Buy offer for ${offer.id}`,
    autoArchiveDuration: 1440,
    type: ChannelType.PrivateThread,
    reason: 'Thread to discuss the offer',
  })
  await thread?.members.add(offer.seller.discordId)
  await thread?.members.add(interaction.user)
  await interaction.reply({ ephemeral: true, content: 'Created a thread to discuss the offer' })
}
