import { getChannel } from '@echo/bot/helpers/get-channel'
import { getThread } from '@echo/bot/helpers/get-thread'
import { sendToThread } from '@echo/bot/helpers/send-to-thread'
import { buildOfferLinkButton } from '@echo/bot/offer/build-offer-link-button'
import { findOfferThread } from '@echo/firestore/crud/offer-thread/find-offer-thread'
import { findUserByUsername } from '@echo/firestore/crud/user/find-user-by-username'
import type { Offer } from '@echo/model/types/offer'
import { Client, userMention } from 'discord.js'
import i18next from 'i18next'
import { isNil } from 'ramda'

async function getOfferReceiverId(offer: Offer) {
  const receiver = await findUserByUsername(offer.receiver.username)
  if (isNil(receiver)) {
    throw Error(`offer receiver with username ${offer.receiver.username} not found for offer ${offer.id}`)
  }
  return receiver.id
}

async function getMessage(offer: Offer) {
  switch (offer.state) {
    case 'OPEN':
      throw Error('There is no offer update for state OPEN')
    case 'COMPLETED':
      return i18next.t('offer.update.COMPLETED')
    case 'CANCELLED':
      return i18next.t('offer.update.CANCELLED')
    case 'ACCEPTED':
    case 'REJECTED':
      const receiverId = await getOfferReceiverId(offer)
      return i18next.t(`offer.update.${offer.state}`, { receiver: userMention(receiverId) })
  }
}

export async function postOfferStateUpdate(client: Client, offer: Offer) {
  const offerThread = await findOfferThread(offer.id)
  if (isNil(offerThread)) {
    throw Error(`offer thread not found for offer ${offer.id}`)
  }
  const channel = await getChannel(client, offerThread.guild.channelId)
  const thread = await getThread(channel, offerThread.guild.threadId)
  const content = await getMessage(offer)
  await sendToThread(thread, {
    components: [buildOfferLinkButton(offer.id)],
    content
  })
}
