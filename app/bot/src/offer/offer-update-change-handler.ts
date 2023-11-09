import { DEFAULT_THREAD_CLOSE_DELAY } from '@echo/bot/constants/default-thread-close-delay'
import { postOfferStateUpdate } from '@echo/bot/offer/post-offer-state-update'
import { postOfferThreadClose } from '@echo/bot/offer/post-offer-thread-close'
import { OFFER_UPDATE_KIND_STATE } from '@echo/firestore/constants/offer/offer-update-kinds'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { findOfferThread } from '@echo/firestore/crud/offer-thread/find-offer-thread'
import { addOfferThreadCloseRequest } from '@echo/firestore/crud/offer-thread-close-request/add-offer-thread-close-request'
import { findOfferThreadCloseRequest } from '@echo/firestore/crud/offer-thread-close-request/find-offer-thread-close-request'
import { addOfferUpdatePost } from '@echo/firestore/crud/offer-update-post/add-offer-update-post'
import { findOfferUpdatePost } from '@echo/firestore/crud/offer-update-post/find-offer-update-post'
import { type DocumentChangeType } from '@echo/firestore/types/abstract/document-change-type'
import type { OfferUpdate } from '@echo/firestore/types/model/offer-update/offer-update'
import dayjs from 'dayjs'
import { Client } from 'discord.js'
import { isNil } from 'ramda'

/**
 * Handles offer updates changes
 * @param client
 * @param changeType
 * @param offer
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
      const { state } = offer
      if (state === 'REJECTED' || state === 'CANCELLED' || state === 'COMPLETED') {
        const thread = await findOfferThread(offer.id)
        if (!isNil(thread)) {
          const threadCloseRequest = await findOfferThreadCloseRequest(thread.id)
          if (isNil(threadCloseRequest)) {
            await addOfferThreadCloseRequest(thread.id, dayjs().add(DEFAULT_THREAD_CLOSE_DELAY, 'h').unix())
            await postOfferThreadClose(client, thread)
          }
        }
      }
    }
  }
}
