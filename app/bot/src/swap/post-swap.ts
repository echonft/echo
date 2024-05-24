import { sendToEchoChannel } from '@echo/bot/helpers/send-to-echo-channel'
import { buildSwapEmbed } from '@echo/bot/swap/build-swap-embed'
import { getOfferById } from '@echo/firestore/crud/offer/get-offer-by-id'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import type { Swap } from '@echo/firestore/types/model/swap/swap'
import type { QueryDocumentSnapshot } from '@echo/firestore/types/query-document-snapshot'
import { isNil } from 'ramda'

export async function postSwap(snapshot: QueryDocumentSnapshot<Swap>) {
  const id = snapshot.id
  const { offerId } = snapshot.data()
  const offer = await getOfferById(offerId)
  if (isNil(offer)) {
    throw Error(`Offer ${offerId} not found not found for swap ${id}`)
  }
  const { sender, receiver } = offer
  const creator = await getUserByUsername(sender.username)
  if (isNil(creator)) {
    throw Error(`Offer creator with username ${sender.username} not found`)
  }
  const counterparty = await getUserByUsername(receiver.username)
  if (isNil(counterparty)) {
    throw Error(`Offer counterparty with username ${receiver.username} not found`)
  }

  await sendToEchoChannel({
    embeds: [buildSwapEmbed(offer, creator, counterparty)]
  })
}
