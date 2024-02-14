import { postOfferStateUpdate } from '@echo/bot/offer/post-offer-state-update'
import { OFFER_UPDATE_KIND_STATE } from '@echo/firestore/constants/offer/offer-update-kinds'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { addOfferUpdatePost } from '@echo/firestore/crud/offer-update-post/add-offer-update-post'
import { findOfferUpdatePost } from '@echo/firestore/crud/offer-update-post/find-offer-update-post'
import { type DocumentChangeType } from '@echo/firestore/types/abstract/document-change-type'
import type { OfferUpdate } from '@echo/firestore/types/model/offer-update/offer-update'
import { Client } from 'discord.js'
import { isNil } from 'ramda'

/**
 * Handles offer updates changes
 * @param client
 * @param changeType
 * @param update
 */
export async function offerUpdateChangeHandler(client: Client, changeType: DocumentChangeType, update: OfferUpdate) {
  if (changeType === 'added') {
    const post = await findOfferUpdatePost(update.id)
    if (isNil(post) && update.update.kind === OFFER_UPDATE_KIND_STATE) {
      const offer = await findOfferById(update.offerId)
      if (isNil(offer)) {
        throw Error(`offer ${update.offerId} for offer update ${update.id} not found`)
      }
      await postOfferStateUpdate(client, offer)
      await addOfferUpdatePost(update.id)
    }
  }
}
