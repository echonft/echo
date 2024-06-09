import { botLogger } from '@echo/bot/constants/bot-logger'
import { getThreadOnEchoChannel } from '@echo/bot/helpers/get-thread-on-echo-channel'
import { archiveOfferThread } from '@echo/bot/offer/archive-offer-thread'
import { postEscrowMessageIfNeeded } from '@echo/bot/offer/post-escrow-message-if-needed'
import { postOfferStateUpdate } from '@echo/bot/offer/post-offer-state-update'
import { getOfferThread } from '@echo/firestore/crud/offer-thread/get-offer-thread'
import { addOfferUpdatePost } from '@echo/firestore/crud/offer-update-post/add-offer-update-post'
import { getOfferUpdatePost } from '@echo/firestore/crud/offer-update-post/get-offer-update-post'
import { getOfferById } from '@echo/firestore/crud/offer/get-offer-by-id'
import { type DocumentChangeType } from '@echo/firestore/types/document-change-type'
import type { OfferUpdate } from '@echo/firestore/types/model/offer-update/offer-update'
import type { QueryDocumentSnapshot } from '@echo/firestore/types/query-document-snapshot'
import { isNil } from 'ramda'

/**
 * Handles offer updates changes
 * @param changeType
 * @param snapshot
 */
export async function offerUpdateChangeHandler(
  changeType: DocumentChangeType,
  snapshot: QueryDocumentSnapshot<OfferUpdate>
) {
  if (changeType === 'added') {
    botLogger.info({ msg: `offer update ${snapshot.id} was added` })
    const post = await getOfferUpdatePost(snapshot.id)
    const update = snapshot.data()
    const offerId = update.offerId
    botLogger.info({ msg: `[OFFER ${offerId}] offer was updated` })
    if (isNil(post)) {
      botLogger.info({ msg: `[OFFER ${offerId}] update post does not exist, creating...` })
      const offer = await getOfferById(offerId)
      if (isNil(offer)) {
        botLogger.error({ msg: `[OFFER ${offerId}] offer not found` })
        return
      }
      const offerThread = await getOfferThread(offerId)
      if (isNil(offerThread)) {
        botLogger.error({ msg: `[OFFER ${offerId}] offer thread not found` })
        return
      }
      const thread = await getThreadOnEchoChannel(offerThread.guild.threadId)
      if (isNil(thread)) {
        botLogger.error({
          msg: `[OFFER ${offerId}] tried to post update to thread ${offerThread.guild.threadId} but this thread does not exist`
        })
        return
      }
      // we only have state updates for now
      // if (update.update.kind === OFFER_UPDATE_KIND_STATE) {
      await postOfferStateUpdate({ offer, offerThread, thread })
      await addOfferUpdatePost(snapshot.id)
      botLogger.info({ msg: `[OFFER ${offerId}] added offer update post to Firestore` })
      if (offer.readOnly && !isNil(offerThread)) {
        // Archive thread if both users don't have anything in escrow
        await postEscrowMessageIfNeeded({ offer, offerThread, thread })
        await archiveOfferThread({ offerThread, thread })
      }
      // }
    } else {
      botLogger.info({ msg: `[OFFER ${offerId}] update post already exists, nothing to do` })
    }
  }
}
