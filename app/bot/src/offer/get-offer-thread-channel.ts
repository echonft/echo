import { getChannel } from '@echo/bot/helpers/get-channel'
import { isGuildMember } from '@echo/bot/helpers/is-guild-member'
import { getOfferItemsGuilds } from '@echo/firestore/helpers/offer/get-offer-items-guilds'
import type { Offer } from '@echo/model/types/offer'
import { Client } from 'discord.js'

export async function getOfferThreadChannel(client: Client, offer: Offer, senderId: string, receiverId: string) {
  const discordGuilds = await getOfferItemsGuilds(offer)
  for (const discordGuild of discordGuilds) {
    const {
      guild: { discordId, channelId }
    } = discordGuild
    const senderIsMember = await isGuildMember(client, discordId, senderId)
    const receiverIsMember = await isGuildMember(client, discordId, receiverId)
    if (senderIsMember && receiverIsMember) {
      return await getChannel(client, channelId)
    }
  }
  return undefined
}
