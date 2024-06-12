import { sendToEchoChannel } from '@echo/bot/helpers/send-to-echo-channel'
import { buildSwapEmbed } from '@echo/bot/swap/build-swap-embed'
import { getOfferById } from '@echo/firestore/crud/offer/get-offer-by-id'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import type { WithLogger } from '@echo/utils/types/with-logger'
import type { Client } from 'discord.js'
import { assoc, isNil } from 'ramda'

interface PostSwapArgs extends WithLogger {
  client: Client
  offerId: string
}

export async function postSwap(args: PostSwapArgs) {
  const { client, offerId, logger } = args
  const fn = 'postSwap'
  const offer = await getOfferById(offerId)
  if (isNil(offer)) {
    logger?.error({ offer: { id: offerId }, fn }, 'offer not found')
    return
  }
  const offerWithId = assoc('id', offerId, offer)
  const { sender, receiver } = offer
  const foundSender = await getUserByUsername(sender.username)
  if (isNil(foundSender)) {
    logger?.error({ offer: offerWithId, fn }, 'sender not found')
    return
  }
  const foundReceiver = await getUserByUsername(receiver.username)
  if (isNil(foundReceiver)) {
    logger?.error({ offer: offerWithId, fn }, 'receiver not found')
    return
  }
  await sendToEchoChannel({
    client,
    payload: {
      embeds: [buildSwapEmbed(offer, foundSender, foundReceiver)]
    },
    logger
  })
  logger?.info({ offer: offerWithId }, 'posted swap to echo channel')
}
