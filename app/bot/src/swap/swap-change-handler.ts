import { botLogger } from '@echo/bot/constants/bot-logger'
import { postSwap } from '@echo/bot/swap/post-swap'
import { addSwapPost } from '@echo/firestore/crud/swap-post/add-swap-post'
import { getSwapPost } from '@echo/firestore/crud/swap-post/get-swap-post'
import { type DocumentChangeType } from '@echo/firestore/types/document-change-type'
import type { Swap } from '@echo/firestore/types/model/swap/swap'
import type { QueryDocumentSnapshot } from '@echo/firestore/types/query-document-snapshot'
import { getEchoDiscordGuild } from '@echo/utils/helpers/get-echo-discord-guild'
import { isNil } from 'ramda'

/**
 * Handles swap changes
 * @param changeType
 * @param snapshot
 */
export async function swapChangeHandler(changeType: DocumentChangeType, snapshot: QueryDocumentSnapshot<Swap>) {
  if (changeType === 'added') {
    const swapId = snapshot.id
    const swap = snapshot.data()
    const offerId = swap.offerId
    botLogger.info({ msg: `[OFFER ${offerId}] swap ${swapId} was added` })
    const echoGuild = getEchoDiscordGuild()
    const post = await getSwapPost({ swapId, guildId: echoGuild.id })
    if (isNil(post)) {
      botLogger.info({ msg: `[OFFER ${offerId}] swap post does not exist, creating...` })
      await postSwap(offerId)
      const { id } = await addSwapPost({ swapId, guild: echoGuild })
      botLogger.info({ msg: `[OFFER ${offerId}] added swap post ${id} to Firestore` })
    } else {
      botLogger.info({ msg: `[OFFER ${offerId}] swap post already exists, nothing to do` })
    }
  }
}
