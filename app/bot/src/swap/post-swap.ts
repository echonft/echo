import { sendToEchoChannel } from '@echo/bot/helpers/send-to-echo-channel'
import { buildSwapEmbed } from '@echo/bot/swap/build-swap-embed'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { findUserByUsername } from '@echo/firestore/crud/user/find-user-by-username'
import type { Swap } from '@echo/firestore/types/model/swap/swap'
import { isNil } from 'ramda'

export async function postSwap(swap: Swap) {
  const { offerId, id } = swap
  const offer = await findOfferById(offerId)
  if (isNil(offer)) {
    throw Error(`Offer ${offerId} not found not found for swap ${id}`)
  }
  const { sender, receiver } = offer
  const creator = await findUserByUsername(sender.username)
  if (isNil(creator)) {
    throw Error(`Offer creator with username ${sender.username} not found`)
  }
  const counterparty = await findUserByUsername(receiver.username)
  if (isNil(counterparty)) {
    throw Error(`Offer counterparty with username ${receiver.username} not found`)
  }

  await sendToEchoChannel({
    embeds: [buildSwapEmbed(offer, creator, counterparty)]
  })
}
