import { archiveOfferThread } from '@echo/bot/offer/archive-offer-thread'
import { postSwap } from '@echo/bot/swap/post-swap'
import type { WithClientType } from '@echo/bot/types/with-client'
import { getOfferThreadByOfferSlug } from '@echo/firestore/crud/offer-thread/get-offer-thread-by-offer-slug'
import { addSwapPost } from '@echo/firestore/crud/swap-post/add-swap-post'
import { getSwapPost } from '@echo/firestore/crud/swap-post/get-swap-post'
import { getSwapOffer } from '@echo/firestore/crud/swap/get-swap-offer'
import type { SwapChangeHandlerArgs } from '@echo/firestore/types/change-handler/swap-change-handler'
import { getEchoDiscordGuild } from '@echo/utils/helpers/get-echo-discord-guild'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { assoc, isNil } from 'ramda'

export async function swapChangeHandler(args: WithLoggerType<WithClientType<SwapChangeHandlerArgs>>) {
  const { client, changeType, snapshot, logger } = args
  if (changeType === 'added') {
    const swapId = snapshot.id
    const swap = snapshot.data()
    const swapWithId = assoc('id', swapId, swap)
    const offer = await getSwapOffer(swap.slug)
    if (isNil(offer)) {
      logger?.info({ swap: swapWithId }, 'swap was added, but offer is nil. Nothing to do')
      return
    }
    logger?.info({ offer, swap: swapWithId }, 'swap was added')
    const echoGuild = getEchoDiscordGuild()
    const post = await getSwapPost({ swapId, guildId: echoGuild.id })
    if (isNil(post)) {
      await postSwap({ client, offer, logger })
      const { id, data } = await addSwapPost({ swapId, guild: echoGuild })
      logger?.info({ offer, swap: swapWithId, swapPost: assoc('id', id, data) }, 'added swap post to Firestore')
    } else {
      logger?.info({ offer, swap: swapWithId }, 'swap post already exists, nothing to do')
    }
    const offerThread = await getOfferThreadByOfferSlug(offer.slug)
    if (!isNil(offerThread)) {
      await archiveOfferThread({ client, offerThread, logger })
    }
  }
}
