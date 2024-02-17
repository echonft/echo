import { echoGuild } from '@echo/bot/constants/echo-guild'
import { createOfferThread } from '@echo/bot/offer/create-offer-thread'
import { addOfferThread } from '@echo/firestore/crud/offer-thread/add-offer-thread'
import { findOfferThread } from '@echo/firestore/crud/offer-thread/find-offer-thread'
import { findUserByUsername } from '@echo/firestore/crud/user/find-user-by-username'
import { type DocumentChangeType } from '@echo/firestore/types/abstract/document-change-type'
import { type Offer } from '@echo/model/types/offer'
import { logger } from '@echo/utils/services/logger'
import { assoc, isNil } from 'ramda'

/**
 * Handles offer changes
 * @param changeType
 * @param offer
 */
export async function offerChangeHandler(changeType: DocumentChangeType, offer: Offer) {
  logger.info(`offer ${offer.id} was written: ${changeType}`)
  const offerThread = await findOfferThread(offer.id)
  if (changeType === 'added' && isNil(offerThread)) {
    const sender = await findUserByUsername(offer.sender.username)
    if (isNil(sender)) {
      throw Error(`offer sender with username ${offer.sender.username} not found`)
    }
    const receiver = await findUserByUsername(offer.receiver.username)
    if (isNil(receiver)) {
      throw Error(`offer receiver with username ${offer.receiver.username} not found`)
    }
    const threadId = await createOfferThread(offer, sender.discord.id, receiver.discord.id)
    await addOfferThread(offer.id, assoc('threadId', threadId, echoGuild))
  }
}
