import { archiveSwapThread } from '@echo/bot/swap/archive-swap-thread'
import { postSwap } from '@echo/bot/swap/post-swap'
import { addSwapPost } from '@echo/firestore/crud/swap-post/add-swap-post'
import { getSwapPost } from '@echo/firestore/crud/swap-post/get-swap-post'
import type { SwapChangeHandlerArgs } from '@echo/firestore/types/change-handler/swap-change-handler'
import { echoDiscordGuild } from '@echo/utils/helpers/echo-discord-guild'
import { assoc, isNil } from 'ramda'

export async function swapChangeHandler({ changeType, snapshot }: SwapChangeHandlerArgs) {
  if (changeType === 'added') {
    const swapId = snapshot.id
    const swap = snapshot.data()
    const swapWithId = assoc('id', swapId, swap)
    logger.info({ swap: swapWithId }, 'swap was added')
    const echoGuild = echoDiscordGuild()
    const post = await getSwapPost({ swapId, guildId: echoGuild.id })
    if (isNil(post)) {
      await postSwap(swap)
      const { id, data } = await addSwapPost({ swapId, guild: echoGuild })
      logger.info({ swap: swapWithId, swapPost: assoc('id', id, data) }, 'added swap post to Firestore')
      await archiveSwapThread(swap)
    }
  }
}
