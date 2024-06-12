import { getThreadOnEchoChannel } from '@echo/bot/helpers/get-thread-on-echo-channel'
import { botLogger } from '@echo/bot/index'
import { archiveOfferThread } from '@echo/bot/offer/archive-offer-thread'
import { postEscrowMessage } from '@echo/bot/offer/post-escrow-message'
import { postOfferStateUpdate } from '@echo/bot/offer/post-offer-state-update'
import type { ChangeHandler } from '@echo/bot/types/change-handler'
import { getOfferThread } from '@echo/firestore/crud/offer-thread/get-offer-thread'
import { addOfferUpdatePost } from '@echo/firestore/crud/offer-update-post/add-offer-update-post'
import { getOfferUpdatePost } from '@echo/firestore/crud/offer-update-post/get-offer-update-post'
import { getOfferById } from '@echo/firestore/crud/offer/get-offer-by-id'
import type { OfferUpdate } from '@echo/firestore/types/model/offer-update/offer-update'
import { assoc, isNil } from 'ramda'

export async function offerUpdateChangeHandler(args: ChangeHandler<OfferUpdate>) {
  const { client, changeType, snapshot } = args
  if (changeType === 'added') {
    botLogger.info({ offerUpdate: { id: snapshot.id } }, 'offer update was added')
    const post = await getOfferUpdatePost(snapshot.id)
    const update = snapshot.data()
    const offerId = update.offerId
    botLogger.info({ offer: { id: offerId } }, 'offer was updated')
    if (isNil(post)) {
      botLogger.info({ offer: { id: offerId } }, 'update post does not exist, creating...')
      const offer = await getOfferById(offerId)
      if (isNil(offer)) {
        botLogger.error({ offer: { id: offerId } }, 'offer not found')
        return
      }
      const offerWithId = assoc('id', offerId, offer)
      const offerThread = await getOfferThread(offerId)
      if (isNil(offerThread)) {
        botLogger.error({ offer: offerWithId }, 'offer thread not found')
        return
      }
      const thread = await getThreadOnEchoChannel(client, offerThread.guild.threadId)
      if (isNil(thread)) {
        botLogger.error(
          { offer: offerWithId, offerThread },
          'tried to post update to offer thread but it does not exist'
        )
        return
      }
      // we only have state updates for now
      // if (update.update.kind === OFFER_UPDATE_KIND_STATE) {
      await postOfferStateUpdate({ offer, offerThread, thread })
      const { id: offerUpdatePostId, data: offerUpdatePostData } = await addOfferUpdatePost(snapshot.id)
      botLogger.info(
        { offer: offerWithId, getOfferUpdatePost: assoc('id', offerUpdatePostId, offerUpdatePostData), offerThread },
        'added offer update post to Firestore'
      )
      if (offer.readOnly && !isNil(offerThread)) {
        // Archive thread if both users don't have anything in escrow
        await postEscrowMessage({ offer, offerThread, thread })
        await archiveOfferThread({ offerThread, thread })
      }
      // }
    } else {
      botLogger.info({ offer: { id: offerId } }, 'update post already exists, nothing to do')
    }
  }
}
