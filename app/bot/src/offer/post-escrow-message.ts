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

async function getUserDiscordId(username: string) {
  const user = await getUserByUsername(username)
  if (isNil(user)) {
    throw Error(`offer receiver with username ${username} not found`)
  }
  return user.discord.id
}

interface PostEscrowMessageArgs extends WithLogger {
  offerThread: OfferThreadDocumentData
  thread: AnyThreadChannel
  offer: Offer
}

export async function postEscrowMessage(args: PostEscrowMessageArgs) {
  const { offer, offerThread, thread, logger } = args
  // TODO check NFTs
  if (offer.state === OfferState.Accepted) {
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
