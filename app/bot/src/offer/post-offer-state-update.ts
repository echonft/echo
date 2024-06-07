import { sendToThread } from '@echo/bot/helpers/send-to-thread'
import { buildOfferLinkButton } from '@echo/bot/offer/build-offer-link-button'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import type { OfferThread } from '@echo/firestore/types/model/offer-thread/offer-thread'
import {
  OFFER_STATE_ACCEPTED,
  OFFER_STATE_CANCELLED,
  OFFER_STATE_COMPLETED,
  OFFER_STATE_EXPIRED,
  OFFER_STATE_OPEN,
  OFFER_STATE_REJECTED
} from '@echo/model/constants/offer-states'
import type { Offer } from '@echo/model/types/offer'
import { pinoLogger } from '@echo/utils/services/pino-logger'
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
    case OFFER_STATE_OPEN:
      throw Error('There is no offer update for state OPEN')
    case OFFER_STATE_COMPLETED:
    case OFFER_STATE_CANCELLED:
    case OFFER_STATE_EXPIRED:
      return i18next.t(`offer.update.${offer.state}`)
    case OFFER_STATE_ACCEPTED:
    case OFFER_STATE_REJECTED: {
      const receiverId = await getOfferReceiverId(offer)
      return i18next.t(`offer.update.${offer.state}`, {
        receiver: userMention(receiverId)
      })
    }
  }
}

export async function postOfferStateUpdate(args: { offerThread: OfferThread; thread: AnyThreadChannel; offer: Offer }) {
  const { offerThread, thread, offer } = args
  const content = await getMessage(offer)
  await sendToThread(thread, {
    components: [buildOfferLinkButton(offer.slug)],
    content
  })
  pinoLogger.info(`[OFFER ${offerThread.offerId}] posted update to thread ${offerThread.guild.threadId}`)
}
