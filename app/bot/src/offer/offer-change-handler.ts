import { echoGuild } from '@echo/bot/constants/echo-guild'
import { createOfferThread } from '@echo/bot/offer/create-offer-thread'
import { addOfferThread } from '@echo/firestore/crud/offer-thread/add-offer-thread'
import { getOfferThread } from '@echo/firestore/crud/offer-thread/get-offer-thread'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { type DocumentChangeType } from '@echo/firestore/types/document-change-type'
import type { QueryDocumentSnapshot } from '@echo/firestore/types/query-document-snapshot'
import { type Offer } from '@echo/model/types/offer'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import { assoc, isNil } from 'ramda'

/**
 * Handles offer changes
 * @param changeType
 * @param snapshot
 */
export async function offerChangeHandler(changeType: DocumentChangeType, snapshot: QueryDocumentSnapshot<Offer>) {
  if (changeType === 'added') {
    pinoLogger.info(`offer ${snapshot.id} was added`)
    const offerThread = await getOfferThread(snapshot.id)
    if (isNil(offerThread)) {
      pinoLogger.info(`[OFFER ${snapshot.id}] offer thread does not exist, creating....`)
      const offer = snapshot.data()
      const sender = await getUserByUsername(offer.sender.username)
      if (isNil(sender)) {
        throw Error(`[OFFER ${snapshot.id}] sender ${offer.sender.username} not found`)
      }
      pinoLogger.info(`[OFFER ${snapshot.id}] sender is ${sender.username}`)
      const receiver = await getUserByUsername(offer.receiver.username)
      if (isNil(receiver)) {
        throw Error(`[OFFER ${snapshot.id}] receiver ${offer.receiver.username} not found`)
      }
      pinoLogger.info(`[OFFER ${snapshot.id}] receiver is ${receiver.username}`)
      const { threadId, state } = await createOfferThread({ offer, offerId: snapshot.id, sender, receiver })
      try {
        const guild = assoc('threadId', threadId, echoGuild)
        const { id } = await addOfferThread({ offerId: snapshot.id, guild, state })
        pinoLogger.info(`[OFFER ${snapshot.id}] added offer thread ${id} to Firestore`)
      } catch (err) {
        pinoLogger.info(`[OFFER ${snapshot.id}] error adding offer thread to Firestore: ${errorMessage(err)}`)
      }
    } else {
      pinoLogger.info(`[OFFER ${snapshot.id}] offer thread already exists, nothing to do`)
    }
  }
}
