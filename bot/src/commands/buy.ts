import { Offer } from '@echo/model/offer'
import { ButtonInteraction, ChannelType } from 'discord.js'
import { DiscordErrors, interactionReplyForError } from 'errors/errors'
import { getDiscordChannel } from 'utils/discord'

export async function executeBuy(interaction: ButtonInteraction, offer: Offer) {
  if (offer.owner.discordId === interaction.user.id) {
    await interaction.reply(interactionReplyForError(DiscordErrors.BUY_OWN))
    return
  }
  const channel = getDiscordChannel(interaction.client, interaction.channelId)
  const thread = await channel?.threads.create({
    name: `Buy offer for ${offer.id}`,
    autoArchiveDuration: 1440,
    type: ChannelType.PrivateThread,
    reason: 'Thread to discuss the offer'
  })
  await thread?.members.add(offer.owner.discordId)
  await thread?.members.add(interaction.user)
  await interaction.reply({ ephemeral: true, content: 'Created a thread to discuss the offer' })
}
