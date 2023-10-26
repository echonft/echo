import { buildOfferLinkButton } from '@echo/bot/offer/build-offer-link-button'
import type { Offer } from '@echo/model/types/offer'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'
import dayjs from 'dayjs'
import type { TextChannel } from 'discord.js'
import { ChannelType, ThreadAutoArchiveDuration, userMention } from 'discord.js'
import i18next from 'i18next'

export async function createOfferThread(channel: TextChannel, offer: Offer, senderId: string, receiverId: string) {
  try {
    const thread = await channel.threads.create({
      name: i18next.t('offer.thread.name', { timestamp: dayjs().unix() }),
      autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
      type: ChannelType.PrivateThread
    })
    await thread.members.add(senderId)
    await thread.members.add(receiverId)
    await thread.send({
      components: [buildOfferLinkButton(offer.id)],
      content: i18next.t('offer.thread.message', { sender: userMention(senderId), receiver: userMention(receiverId) })
    })
    return thread.id
  } catch (e) {
    logger.error(`Error creating thread for offer ${offer.id}: ${errorMessage(e)}`)
    return undefined
  }
}
