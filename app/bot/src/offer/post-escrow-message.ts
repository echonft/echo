import { sendToThread } from '@echo/bot/helpers/send-to-thread'
import { buildOfferLinkButton } from '@echo/bot/offer/build-offer-link-button'
import { getOfferUpdatesByOfferId } from '@echo/firestore/crud/offer-update/get-offer-updates-by-offer-id'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import type { OfferThreadDocumentData } from '@echo/firestore/types/model/offer-thread-document-data'
import { OFFER_STATE_ACCEPTED, OFFER_STATE_EXPIRED, OFFER_STATE_REJECTED } from '@echo/model/constants/offer-states'
import type { Offer } from '@echo/model/types/offer'
import type { WithLogger } from '@echo/utils/types/with-logger'
import { type AnyThreadChannel, userMention } from 'discord.js'
import i18next from 'i18next'
import { any, isEmpty, isNil, pathEq } from 'ramda'

async function getUserDiscordId(username: string) {
  const user = await getUserByUsername(username)
  if (isNil(user)) {
    throw Error(`offer receiver with username ${username} not found`)
  }
  return user.discord.id
}

function shouldPostEscrowMessage(offer: Offer) {
  // On a rejection or expiry, you need to take out escrow
  return offer.state === OFFER_STATE_REJECTED || offer.state === OFFER_STATE_EXPIRED
}

interface AreBothPartiesInEscrowArgs extends WithLogger {
  offerId: string
}

async function areBothPartiesInEscrow(args: AreBothPartiesInEscrowArgs) {
  const { offerId, logger } = args
  const updates = await getOfferUpdatesByOfferId(offerId)
  if (isEmpty(updates)) {
    logger?.error({ offer: { id: offerId } }, 'checked for escrow status but no updates were found')
    return false
  }
  // If there was an accepted state update, it means both parties are in escrow
  return any(pathEq(OFFER_STATE_ACCEPTED, ['update', 'args', 'state']))(updates)
}

interface PostEscrowMessageArgs extends WithLogger {
  offerThread: OfferThreadDocumentData
  thread: AnyThreadChannel
  offer: Offer
}

export async function postEscrowMessage(args: PostEscrowMessageArgs) {
  const { offer, offerThread, thread, logger } = args
  if (shouldPostEscrowMessage(offer)) {
    if (await areBothPartiesInEscrow({ offerId: offerThread.offerId, logger })) {
      const senderId = await getUserDiscordId(offer.sender.username)
      const receiverId = await getUserDiscordId(offer.receiver.username)
      await sendToThread(thread, {
        components: [buildOfferLinkButton(offer)],
        content: i18next.t('offer.thread.redeemable.multiple', {
          sender: userMention(senderId),
          receiver: userMention(receiverId)
        })
      })
    } else {
      const senderId = await getUserDiscordId(offer.sender.username)
      await sendToThread(thread, {
        components: [buildOfferLinkButton(offer)],
        content: i18next.t('offer.thread.redeemable.single', { redeemer: userMention(senderId) })
      })
    }
    logger?.info({ offer, offerThread }, 'posted escrow update to thread')
  }
}
