import { sendToThread } from '@echo/bot/helpers/send-to-thread'
import { buildOfferLinkButton } from '@echo/bot/offer/build-offer-link-button'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import type { OfferThreadDocumentData } from '@echo/firestore/types/model/offer-thread-document-data'
import { OfferState } from '@echo/model/constants/offer-state'
import type { Offer } from '@echo/model/types/offer/offer'
import type { WithLogger } from '@echo/utils/types/with-logger'
import { type AnyThreadChannel, userMention } from 'discord.js'
import i18next from 'i18next'
import { isNil } from 'ramda'

async function getOfferReceiverId(offer: Offer) {
  const receiver = await getUserByUsername(offer.receiver.username)
  if (isNil(receiver)) {
    throw Error(`offer receiver with username ${offer.receiver.username} not found for offer ${offer.slug}`)
  }
  return receiver.discord.id
}

async function getMessage(offer: Offer) {
  switch (offer.state) {
    case OfferState.Open:
      throw Error('There is no offer update for state OPEN')
    case OfferState.Completed:
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

interface PostOfferStateUpdateArgs extends WithLogger {
  offerThread: OfferThreadDocumentData
  thread: AnyThreadChannel
  offer: Offer
}

export async function postOfferStateUpdate(args: PostOfferStateUpdateArgs) {
  const { offerThread, thread, offer, logger } = args
  const content = await getMessage(offer)
  await sendToThread(thread, {
    components: [buildOfferLinkButton(offer)],
    content
  })
  logger?.info({ offer, offerThread }, 'posted update to thread')
}
