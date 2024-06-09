import { botLogger } from '@echo/bot/constants/bot-logger'
import { sendToEchoChannel } from '@echo/bot/helpers/send-to-echo-channel'
import { buildSwapEmbed } from '@echo/bot/swap/build-swap-embed'
import { getOfferById } from '@echo/firestore/crud/offer/get-offer-by-id'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { isNil } from 'ramda'

export async function postSwap(offerId: string) {
  const offer = await getOfferById(offerId)
  if (isNil(offer)) {
    botLogger.error({ msg: `[OFFER ${offerId}] offer not found` })
    return
  }
  const { sender, receiver } = offer
  const creator = await getUserByUsername(sender.username)
  if (isNil(creator)) {
    botLogger.error({ msg: `[OFFER ${offerId}] sender ${sender.username} not found` })
    return
  }
  const counterparty = await getUserByUsername(receiver.username)
  if (isNil(counterparty)) {
    botLogger.error({ msg: `[OFFER ${offerId}] receiver ${receiver.username} not found` })
    return
  }
  await sendToEchoChannel({
    embeds: [buildSwapEmbed(offer, creator, counterparty)]
  })
  botLogger.info({ msg: `[OFFER ${offerId}] posted swap to echo channel` })
}
