import { archiveOfferThread } from '@echo/bot/offer/archive-offer-thread'
import { postOfferStateUpdate } from '@echo/bot/offer/post-offer-state-update'
import { OFFER_UPDATE_KIND_STATE } from '@echo/firestore/constants/offer/offer-update-kinds'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { findOfferThread } from '@echo/firestore/crud/offer-thread/find-offer-thread'
import { addOfferUpdatePost } from '@echo/firestore/crud/offer-update-post/add-offer-update-post'
import { findOfferUpdatePost } from '@echo/firestore/crud/offer-update-post/find-offer-update-post'
import { type DocumentChangeType } from '@echo/firestore/types/document-change-type'
import type { OfferUpdate } from '@echo/firestore/types/model/offer-update/offer-update'
import { isNil } from 'ramda'

/**
 * Handles offer updates changes
 * @param changeType
 * @param update
 */
export async function offerUpdateChangeHandler(changeType: DocumentChangeType, update: OfferUpdate) {
  if (changeType === 'added') {
    const post = await findOfferUpdatePost(update.id)
    if (isNil(post) && update.update.kind === OFFER_UPDATE_KIND_STATE) {
      const offer = await findOfferById(update.offerId)
      if (isNil(offer)) {
        throw Error(`offer ${update.offerId} for offer update ${update.id} not found`)
      }
      await postOfferStateUpdate(offer)
      await addOfferUpdatePost(update.id)
      if (offer.readOnly) {
        const offerThread = await findOfferThread(offer.id)
        if (isNil(offerThread)) {
          throw Error(`offer thread for offer ${offer.id} not found`)
        }
        await archiveOfferThread(offerThread)
      }
    }
  }
}
