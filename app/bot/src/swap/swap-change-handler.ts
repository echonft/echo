import { archiveOfferThread } from '@echo/bot/offer/archive-offer-thread'
import { postSwap } from '@echo/bot/swap/post-swap'
import { addSwapPost } from '@echo/firestore/crud/swap-post/add-swap-post'
import { getSwapPost } from '@echo/firestore/crud/swap-post/get-swap-post'
import { getSwapOffer } from '@echo/firestore/crud/swap/get-swap-offer'
import type { SwapChangeHandlerArgs } from '@echo/firestore/types/change-handler/swap-change-handler'
import { echoDiscordGuild } from '@echo/utils/helpers/echo-discord-guild'
import type { Client } from 'discord.js'
import { assoc, isNil } from 'ramda'

interface Args extends SwapChangeHandlerArgs {
  readonly client: Client
}

export async function swapChangeHandler(args: Args) {
  const { client, changeType, snapshot } = args
  if (changeType === 'added') {
    const swapId = snapshot.id
    const swap = snapshot.data()
    const swapWithId = assoc('id', swapId, swap)
    const offer = await getSwapOffer(swap.slug)
    if (isNil(offer)) {
      logger.warn({ swap: swapWithId }, 'swap was added, but offer is nil. Nothing to do')
      return
    }
    logger.info({ offer, swap: swapWithId }, 'swap was added')
    const echoGuild = echoDiscordGuild()
    const post = await getSwapPost({ swapId, guildId: echoGuild.id })
    if (isNil(post)) {
      await postSwap({ client, offer })
      const { id, data } = await addSwapPost({ swapId, guild: echoGuild })
      logger.info({ offer, swap: swapWithId, swapPost: assoc('id', id, data) }, 'added swap post to Firestore')
      await archiveOfferThread({ client, offer })
    }
  }
}
