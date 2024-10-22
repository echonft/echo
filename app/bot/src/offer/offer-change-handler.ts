import { createOfferThread } from '@echo/bot/offer/create-offer-thread'
import { postOfferUpdate } from '@echo/bot/offer/post-offer-update'
import type { WithClientType } from '@echo/bot/types/with-client'
import { addOfferThread } from '@echo/firestore/crud/offer-thread/add-offer-thread'
import { archiveOfferThread } from '@echo/firestore/crud/offer-thread/archive-offer-thread'
import { getOfferThreadByOfferId } from '@echo/firestore/crud/offer-thread/get-offer-thread-by-offer-id'
import { addOfferUpdatePost } from '@echo/firestore/crud/offer-update-post/add-offer-update-post'
import { getOfferUpdatePost } from '@echo/firestore/crud/offer-update-post/get-offer-update-post'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import type { OfferChangeHandlerArgs } from '@echo/firestore/types/change-handler/offer-change-handler'
import { getEchoDiscordGuild } from '@echo/utils/helpers/get-echo-discord-guild'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { assoc, isNil } from 'ramda'

export async function offerChangeHandler(args: WithLoggerType<WithClientType<OfferChangeHandlerArgs>>) {
  const { client, changeType, snapshot, logger } = args
  const { id } = snapshot
  if (changeType === 'added') {
    logger?.info({ offer: { id } }, 'offer was added')
    const offerThread = await getOfferThreadByOfferId(id)
    if (isNil(offerThread)) {
      const offer = snapshot.data()
      const offerWithId = assoc('id', id, offer)
      const sender = await getUserByUsername(offer.sender.username)
      if (isNil(sender)) {
        logger?.error({ offer: offerWithId }, 'sender not found')
        return
      }
      const receiver = await getUserByUsername(offer.receiver.username)
      if (isNil(receiver)) {
        logger?.error({ offer: offerWithId }, 'receiver not found')
        return
      }
      const { threadId, archive } = await createOfferThread({ client, offer: offerWithId, sender, receiver, logger })
      try {
        const guild = assoc('threadId', threadId, getEchoDiscordGuild())
        const { id: offerThreadId, data } = await addOfferThread({ offerId: id, guild })
        const offerThread = assoc('id', offerThreadId, data)
        logger?.info({ offer: offerWithId, offerThread }, 'added offer thread to Firestore')
        if (archive) {
          await archiveOfferThread(id)
          logger?.info({ offer: offerWithId, offerThread }, 'archived offer thread in Firestore')
        }
      } catch (err) {
        logger?.error({ offer: offerWithId, err }, 'error adding offer thread to Firestore')
      }
    } else {
      logger?.info({ offer: { id } }, 'offer thread already exists, nothing to do')
    }
  } else if (changeType === 'modified') {
    logger?.info({ offer: { id } }, 'offer was modified')
    const offer = snapshot.data()
    const postArgs = { offerId: id, state: offer.state }
    const post = await getOfferUpdatePost(postArgs)
    if (isNil(post)) {
      const offerWithId = assoc('id', id, offer)
      const offerThread = await getOfferThreadByOfferId(id)
      if (isNil(offerThread)) {
        logger?.error({ offer: offerWithId }, 'offer thread not found')
        return
      }
      await postOfferUpdate({ client, offer, offerThread, logger })
      const { id: offerUpdatePostId, data: offerUpdatePostData } = await addOfferUpdatePost(postArgs)
      logger?.info(
        { offer: offerWithId, getOfferUpdatePost: assoc('id', offerUpdatePostId, offerUpdatePostData), offerThread },
        'added offer update post to Firestore'
      )
      // FIXME
      // if (offer.state === OfferState.Rejected || offer.state === OfferState.Expired) {
      //
      // }
    } else {
      logger?.info({ offer: { id } }, 'update post already exists, nothing to do')
    }
  }
}
