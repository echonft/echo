import { sendToThread } from '@echo/bot/helpers/send-to-thread'
import { buildOfferLinkButton } from '@echo/bot/offer/build-offer-link-button'
import { getOfferThreadOnEchoChannel } from '@echo/bot/offer/get-offer-thread-on-echo-channel'
import { addOfferUpdatePost } from '@echo/firestore/crud/offer-update-post/add-offer-update-post'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import { UserError } from '@echo/model/constants/errors/user-error'
import { OfferState } from '@echo/model/constants/offer-state'
import type { Offer } from '@echo/model/types/offer'
import { type Client, userMention } from 'discord.js'
import i18next from 'i18next'
import { assoc, isNil } from 'ramda'

async function getOfferReceiverId(offer: Offer) {
  const receiver = await getUserByUsername(offer.receiver.username)
  if (isNil(receiver)) {
    return Promise.reject(Error(UserError.NotFound))
  }
  return receiver.discord.id
}

async function getMessage(offer: Offer) {
  switch (offer.state) {
    case OfferState.Open:
      throw Error(OfferError.InvalidState)
    case OfferState.Cancelled:
    case OfferState.Expired:
      return i18next.t(`offer.update.${offer.state}`)
    case OfferState.Accepted:
    case OfferState.Rejected: {
      const receiverId = await getOfferReceiverId(offer)
      return i18next.t(`offer.update.${offer.state}`, {
        receiver: userMention(receiverId)
      })
    }
  }
}

interface PostOfferStateUpdateArgs {
  readonly client: Client
  readonly offer: Offer
}

export async function postOfferUpdate(args: PostOfferStateUpdateArgs) {
  const { offer } = args
  const { offerThread, thread } = await getOfferThreadOnEchoChannel(args)
  if (!isNil(thread) && !isNil(offerThread)) {
    const content = await getMessage(offer)
    await sendToThread(thread, {
      components: [buildOfferLinkButton(offer)],
      content
    })
    logger.info({ offer, offerThread }, 'posted offer update to thread')
    const { id: offerUpdatePostId, data: offerUpdatePostData } = await addOfferUpdatePost({
      offerId: offerThread.offerId,
      state: offer.state
    })
    logger.info(
      { offer, offerUpdatePost: assoc('id', offerUpdatePostId, offerUpdatePostData) },
      'added offer update post to Firestore'
    )
  }
}
