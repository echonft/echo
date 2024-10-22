import { sendToEchoChannel } from '@echo/bot/helpers/send-to-echo-channel'
import { sendToThread } from '@echo/bot/helpers/send-to-thread'
import { getOfferThreadOnEchoChannel } from '@echo/bot/offer/get-offer-thread-on-echo-channel'
import { buildSwapEmbed } from '@echo/bot/swap/build-swap-embed'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import type { Offer } from '@echo/model/types/offer/offer'
import type { WithLogger } from '@echo/utils/types/with-logger'
import type { Client } from 'discord.js'
import i18next from 'i18next'
import { isNil } from 'ramda'

interface PostSwapArgs extends WithLogger {
  client: Client
  offer: Offer
}

export async function postSwap(args: PostSwapArgs) {
  const { client, offer, logger } = args
  const { sender, receiver } = offer
  const foundSender = await getUserByUsername(sender.username)
  if (isNil(foundSender)) {
    logger?.error({ offer }, 'sender not found')
    return
  }
  const foundReceiver = await getUserByUsername(receiver.username)
  if (isNil(foundReceiver)) {
    logger?.error({ offer }, 'receiver not found')
    return
  }
  await sendToEchoChannel({
    client,
    payload: {
      embeds: [buildSwapEmbed(offer, foundSender, foundReceiver)]
    },
    logger
  })
  logger?.info({ offer }, 'posted swap to echo channel')
  const { offerThread, thread } = await getOfferThreadOnEchoChannel(args)
  if (!isNil(thread) && !isNil(offerThread)) {
    await sendToThread(thread, {
      content: i18next.t('swap.update')
    })
    logger?.info({ offer, offerThread }, 'posted update to thread')
  }
}
