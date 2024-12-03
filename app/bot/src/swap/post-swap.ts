import { sendToEchoChannel } from '@echo/bot/helpers/send-to-echo-channel'
import { sendToThread } from '@echo/bot/helpers/send-to-thread'
import { buildSwapEmbed } from '@echo/bot/swap/build-swap-embed'
import { getSwapThreadOnEchoChannel } from '@echo/bot/swap/get-swap-thread-on-echo-channel'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import type { SwapDocument } from '@echo/firestore/types/model/swap-document'
import i18next from 'i18next'
import { isNil } from 'ramda'

export async function postSwap(swap: SwapDocument) {
  const { sender, receiver } = swap
  const foundSender = await getUserByUsername(sender.username)
  if (isNil(foundSender)) {
    logger.error({ swap }, 'sender not found')
    return
  }
  const foundReceiver = await getUserByUsername(receiver.username)
  if (isNil(foundReceiver)) {
    logger.error({ swap }, 'receiver not found')
    return
  }
  await sendToEchoChannel({
    embeds: [buildSwapEmbed(swap, foundSender, foundReceiver)]
  })
  logger.info({ swap }, 'posted swap to echo channel')
  const { offerThread, thread } = await getSwapThreadOnEchoChannel(swap)
  if (!isNil(thread) && !isNil(offerThread)) {
    await sendToThread(thread, {
      content: i18next.t('swap.update')
    })
    logger.info({ swap, offerThread }, 'posted update to thread')
  }
}
