import { echoGuild } from '@echo/bot/constants/echo-guild'
import { postSwap } from '@echo/bot/swap/post-swap'
import { addSwapPost } from '@echo/firestore/crud/swap-post/add-swap-post'
import { getSwapPost } from '@echo/firestore/crud/swap-post/get-swap-post'
import { type DocumentChangeType } from '@echo/firestore/types/document-change-type'
import type { Swap } from '@echo/firestore/types/model/swap/swap'
import type { QueryDocumentSnapshot } from '@echo/firestore/types/query-document-snapshot'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import { isNil } from 'ramda'

/**
 * Handles swap changes
 * @param changeType
 * @param snapshot
 */
export async function swapChangeHandler(changeType: DocumentChangeType, snapshot: QueryDocumentSnapshot<Swap>) {
  pinoLogger.info(`swap for offer ${snapshot.data().offerId} was written: ${changeType}`)
  if (changeType === 'added') {
    // TODO get the offer guilds when we support it
    const post = await getSwapPost({ swapId: snapshot.id, guildId: echoGuild.id })
    if (isNil(post)) {
      await postSwap(snapshot)
      await addSwapPost({ swapId: snapshot.id, guild: echoGuild })
    }
  }
}
