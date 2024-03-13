import { echoGuild } from '@echo/bot/constants/echo-guild'
import { postSwap } from '@echo/bot/swap/post-swap'
import { addSwapPost } from '@echo/firestore/crud/swap-post/add-swap-post'
import { findSwapPost } from '@echo/firestore/crud/swap-post/find-swap-post'
import { type DocumentChangeType } from '@echo/firestore/types/document-change-type'
import type { Swap } from '@echo/firestore/types/model/swap/swap'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import { isNil } from 'ramda'

/**
 * Handles swap changes
 * @param changeType
 * @param listing
 */
export async function swapChangeHandler(changeType: DocumentChangeType, swap: Swap) {
  pinoLogger.info(`swap ${swap.id} was written: ${changeType}`)
  if (changeType === 'added') {
    // TODO Should probably consider that it can be posted to other servers but works for now
    const post = await findSwapPost(swap.id, echoGuild.discordId)
    if (isNil(post)) {
      await postSwap(swap)
      await addSwapPost(swap.id, echoGuild)
    }
  }
}
