import { offerLink } from '@echo/bot/offer/offer-link'
import type { Offer } from '@echo/model/types/offer'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'
import type { TextChannel } from 'discord.js'
import { ChannelType } from 'discord.js'
import i18next from 'i18next'

export async function createOfferThread(channel: TextChannel, offer: Offer, senderId: string, receiverId: string) {
  try {
    const link = offerLink(offer)
    const message = i18next.t('offer.thread.reason', { link })
    const thread = await channel.threads.create({
      name: i18next.t('offer.thread.title', { offerId: offer.id }),
      autoArchiveDuration: 10080,
      type: ChannelType.PrivateThread,
      reason: message
    })
    await thread.members.add(senderId)
    await thread.members.add(receiverId)
    await thread.send({
      content: message
    })
    // TODO would be nice to 1) have a button to view the offer instead of a link
    // 2) add buttons to accept/reject/cancel offer
    return thread.id
  } catch (e) {
    logger.error(`Error creating offer thread for offer ${offer.id}: ${errorMessage(e)}`)
    return undefined
  }
}
