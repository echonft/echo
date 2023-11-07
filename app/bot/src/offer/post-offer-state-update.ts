import { guarded_findOfferThread } from '@echo/bot/firestore/guarded_find-offer-thread'
import { guarded_findUserByUsername } from '@echo/bot/firestore/guarded_find-user-by-username'
import { getChannel } from '@echo/bot/helpers/get-channel'
import { getThread } from '@echo/bot/helpers/get-thread'
import { sendToThread } from '@echo/bot/helpers/send-to-thread'
import { buildOfferLinkButton } from '@echo/bot/offer/build-offer-link-button'
import type { Offer } from '@echo/model/types/offer'
import { logger } from '@echo/utils/services/logger'
import { Client, userMention } from 'discord.js'
import i18next from 'i18next'
import { isNil } from 'ramda'

async function getOfferReceiverId(offer: Offer) {
  const receiver = await guarded_findUserByUsername(offer.receiver.username)
  if (isNil(receiver)) {
    return undefined
  }
  return receiver.id
}

async function getMessage(offer: Offer) {
  switch (offer.state) {
    case 'OPEN':
      logger.error('There is no offer update for state OPEN')
      return undefined
    case 'COMPLETED':
      return i18next.t('offer.update.COMPLETED')
    case 'CANCELLED':
      return i18next.t('offer.update.CANCELLED')
    case 'ACCEPTED':
    case 'REJECTED':
      const receiverId = await getOfferReceiverId(offer)
      if (isNil(receiverId)) {
        return undefined
      }
      return i18next.t(`offer.update.${offer.state}`, { receiver: userMention(receiverId) })
  }
}

export async function postOfferStateUpdate(client: Client, offer: Offer) {
  const offerThread = await guarded_findOfferThread(offer.id)
  if (isNil(offerThread)) {
    return
  }
  const channel = await getChannel(client, offerThread.guild.channelId)
  if (isNil(channel)) {
    return
  }
  const thread = await getThread(channel, offerThread.guild.threadId)
  if (isNil(thread)) {
    return
  }
  const content = await getMessage(offer)
  if (isNil(content)) {
    return
  }
  await sendToThread(thread, {
    components: [buildOfferLinkButton(offer.id)],
    content
  })
}
