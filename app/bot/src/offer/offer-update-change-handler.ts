import { archiveOfferThread } from '@echo/bot/offer/archive-offer-thread'
import { postOfferStateUpdate } from '@echo/bot/offer/post-offer-state-update'
import { OFFER_UPDATE_KIND_STATE } from '@echo/firestore/constants/offer/offer-update-kinds'
import { getOfferById } from '@echo/firestore/crud/offer/get-offer-by-id'
import { getOfferThread } from '@echo/firestore/crud/offer-thread/get-offer-thread'
import { addOfferUpdatePost } from '@echo/firestore/crud/offer-update-post/add-offer-update-post'
import { getOfferUpdatePost } from '@echo/firestore/crud/offer-update-post/get-offer-update-post'
import { type DocumentChangeType } from '@echo/firestore/types/document-change-type'
import type { OfferUpdate } from '@echo/firestore/types/model/offer-update/offer-update'
import type { QueryDocumentSnapshot } from '@echo/firestore/types/query-document-snapshot';
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
    const post = await getOfferUpdatePost(snapshot.id)
    const update = snapshot.data()
    if (isNil(post) && update.update.kind === OFFER_UPDATE_KIND_STATE) {
      const offer = await getOfferById(update.offerId)
      if (isNil(offer)) {
        throw Error(`offer ${update.offerId} for offer update ${snapshot.id} not found`)
      }
      await postOfferStateUpdate(offer)
      await addOfferUpdatePost(snapshot.id)
      if (offer.readOnly) {
        const offerThread = await getOfferThread(update.offerId)
        if (isNil(offerThread)) {
          throw Error(`offer thread for offer ${update.offerId} not found`)
        }
        await archiveOfferThread(offerThread)
      }
    }
  }
}
