import { getChannel } from '@echo/bot/helpers/get-channel'
import { buildOfferLinkButton } from '@echo/bot/offer/build-offer-link-button'
import { findOfferThread } from '@echo/firestore/crud/offer-thread/find-offer-thread'
import { addOfferStateUpdate } from '@echo/firestore/crud/offer-update/add-offer-state-update'
import { findUserByUsername } from '@echo/firestore/crud/user/find-user-by-username'
import type { Offer } from '@echo/model/types/offer'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'
import { Client, userMention } from 'discord.js'
import i18next from 'i18next'
import { isNil } from 'ramda'

async function getOfferReceiverId(offer: Offer) {
  const receiver = await findUserByUsername(offer.receiver.username)
  if (isNil(receiver)) {
    throw Error(`offer with id ${offer.id} receiver with username ${offer.receiver.username} not found in the database`)
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
    logger.error(`Error posting state update for offer ${offer.id}: offer thread does not exist in the database`)
    return
  }
  try {
    const channel = await getChannel(client, offerThread.guild.channelId)
    const thread = await channel.threads.fetch(offerThread.guild.threadId)
    if (isNil(thread)) {
      logger.error(
        `Error posting state update for offer ${offer.id}: thread id ${offerThread.guild.threadId} not found`
      )
      return
    }
    const content = await getMessage(offer)
    await thread.send({
      components: [buildOfferLinkButton(offer.id)],
      content
    })
    await addOfferStateUpdate(offer.id)
  } catch (e) {
    logger.error(`Error posting state update for offer ${offer.id}: ${errorMessage(e)}`)
  }
}
