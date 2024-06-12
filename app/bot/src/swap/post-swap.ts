import { sendToEchoChannel } from '@echo/bot/helpers/send-to-echo-channel'
import { botLogger } from '@echo/bot/index'
import { buildSwapEmbed } from '@echo/bot/swap/build-swap-embed'
import { getOfferById } from '@echo/firestore/crud/offer/get-offer-by-id'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import type { Client } from 'discord.js'
import { assoc, isNil } from 'ramda'

export async function postSwap(client: Client, offerId: string) {
  const fn = 'postSwap'
  const offer = await getOfferById(offerId)
  if (isNil(offer)) {
    botLogger.error({ offer: { id: offerId }, fn }, 'offer not found')
    return
  }
  const offerWithId = assoc('id', offerId, offer)
  const { sender, receiver } = offer
  const foundSender = await getUserByUsername(sender.username)
  if (isNil(foundSender)) {
    botLogger.error({ offer: offerWithId, fn }, 'sender not found')
    return
  }
  const foundReceiver = await getUserByUsername(receiver.username)
  if (isNil(foundReceiver)) {
    botLogger.error({ offer: offerWithId, fn }, 'receiver not found')
    return
  }
  await sendToEchoChannel(client, {
    embeds: [buildSwapEmbed(offer, foundSender, foundReceiver)]
  })
  botLogger.info({ offer: offerWithId }, 'posted swap to echo channel')
}
