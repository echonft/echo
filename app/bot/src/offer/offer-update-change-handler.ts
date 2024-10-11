import { getThreadOnEchoChannel } from '@echo/bot/helpers/get-thread-on-echo-channel'
import { archiveOfferThread } from '@echo/bot/offer/archive-offer-thread'
import { postEscrowMessage } from '@echo/bot/offer/post-escrow-message'
import { postOfferStateUpdate } from '@echo/bot/offer/post-offer-state-update'
import type { WithClientType } from '@echo/bot/types/with-client'
import { getOfferThread } from '@echo/firestore/crud/offer-thread/get-offer-thread'
import { addOfferUpdatePost } from '@echo/firestore/crud/offer-update-post/add-offer-update-post'
import { getOfferUpdatePost } from '@echo/firestore/crud/offer-update-post/get-offer-update-post'
import { getOfferById } from '@echo/firestore/crud/offer/get-offer-by-id'
import type { OfferUpdateChangeHandlerArgs } from '@echo/firestore/types/change-handler/offer-update-change-handler'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { assoc, isNil } from 'ramda'

export async function offerUpdateChangeHandler(args: WithLoggerType<WithClientType<OfferUpdateChangeHandlerArgs>>) {
  const { client, changeType, snapshot, logger } = args
  if (changeType === 'added') {
    logger?.info({ offerUpdate: { id: snapshot.id } }, 'offer update was added')
    const post = await getOfferUpdatePost(snapshot.id)
    const update = snapshot.data()
    const offerId = update.offerId
    logger?.info({ offer: { id: offerId } }, 'offer was updated')
    if (isNil(post)) {
      logger?.info({ offer: { id: offerId } }, 'update post does not exist, creating...')
      const offer = await getOfferById(offerId)
      if (isNil(offer)) {
        logger?.error({ offer: { id: offerId } }, 'offer not found')
        return
      }
      const offerWithId = assoc('id', offerId, offer)
      const offerThread = await getOfferThread(offerId)
      if (isNil(offerThread)) {
        logger?.error({ offer: offerWithId }, 'offer thread not found')
        return
      }
      const thread = await getThreadOnEchoChannel({ client, threadId: offerThread.guild.threadId, logger })
      if (isNil(thread)) {
        logger?.error({ offer: offerWithId, offerThread }, 'tried to post update to offer thread but it does not exist')
        return
      }
      // we only have state updates for now
      // if (update.update.kind === OFFER_UPDATE_KIND_STATE) {
      await postOfferStateUpdate({ offer, offerThread, thread, logger })
      const { id: offerUpdatePostId, data: offerUpdatePostData } = await addOfferUpdatePost(snapshot.id)
      logger?.info(
        { offer: offerWithId, getOfferUpdatePost: assoc('id', offerUpdatePostId, offerUpdatePostData), offerThread },
        'added offer update post to Firestore'
      )
      if (offer.readOnly && !isNil(offerThread)) {
        // Archive thread if both users don't have anything in escrow
        await postEscrowMessage({ offer, offerThread, thread, logger })
        await archiveOfferThread({ offerThread, thread, logger })
      }
      // }
    } else {
      logger?.info({ offer: { id: offerId } }, 'update post already exists, nothing to do')
    }
  }
}
