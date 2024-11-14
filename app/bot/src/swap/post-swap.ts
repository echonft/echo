import { sendToEchoChannel } from '@echo/bot/helpers/send-to-echo-channel'
import { sendToThread } from '@echo/bot/helpers/send-to-thread'
import { getOfferThreadOnEchoChannel } from '@echo/bot/offer/get-offer-thread-on-echo-channel'
import { buildSwapEmbed } from '@echo/bot/swap/build-swap-embed'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import type { Offer } from '@echo/model/types/offer'
import i18next from 'i18next'
import { isNil } from 'ramda'

export async function postSwap(offer: Offer) {
  const { sender, receiver } = offer
  const foundSender = await getUserByUsername(sender.username)
  if (isNil(foundSender)) {
    logger.error({ offer }, 'sender not found')
    return
  }
  const foundReceiver = await getUserByUsername(receiver.username)
  if (isNil(foundReceiver)) {
    logger.error({ offer }, 'receiver not found')
    return
  }
  await sendToEchoChannel({
    embeds: [buildSwapEmbed(offer, foundSender, foundReceiver)]
  })
  logger.info({ offer }, 'posted swap to echo channel')
  const { offerThread, thread } = await getOfferThreadOnEchoChannel(offer)
  if (!isNil(thread) && !isNil(offerThread)) {
    await sendToThread(thread, {
      content: i18next.t('swap.update')
    })
    logger.info({ offer, offerThread }, 'posted update to thread')
  }
}
