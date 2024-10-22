import { sendToEchoChannel } from '@echo/bot/helpers/send-to-echo-channel'
import { buildSwapEmbed } from '@echo/bot/swap/build-swap-embed'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import type { Offer } from '@echo/model/types/offer/offer'
import type { WithLogger } from '@echo/utils/types/with-logger'
import type { Client } from 'discord.js'
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
  // FIXME
  // if (offer.locked && !isNil(offerThread)) {
  //   // Archive thread if both users don't have anything in escrow
  //   await postEscrowMessage({ offer, offerThread, thread, logger })
  // }
}
