import { botLogger } from '@echo/bot/index'
import { postSwap } from '@echo/bot/swap/post-swap'
import type { ChangeHandler } from '@echo/bot/types/change-handler'
import { addSwapPost } from '@echo/firestore/crud/swap-post/add-swap-post'
import { getSwapPost } from '@echo/firestore/crud/swap-post/get-swap-post'
import type { Swap } from '@echo/firestore/types/model/swap/swap'
import { getEchoDiscordGuild } from '@echo/utils/helpers/get-echo-discord-guild'
import { assoc, isNil } from 'ramda'

export async function swapChangeHandler(args: ChangeHandler<Swap>) {
  const { client, changeType, snapshot } = args
  if (changeType === 'added') {
    const swapId = snapshot.id
    const swap = snapshot.data()
    const swapWithId = assoc('id', swapId, swap)
    const offerId = swap.offerId
    botLogger.info({ offer: { id: offerId }, swap: swapWithId }, 'swap was added')
    const echoGuild = getEchoDiscordGuild()
    const post = await getSwapPost({ swapId, guildId: echoGuild.id })
    if (isNil(post)) {
      botLogger.info({ offer: { id: offerId }, swap: swapWithId }, 'swap post does not exist, creating...')
      await postSwap(client, offerId)
      const { id, data } = await addSwapPost({ swapId, guild: echoGuild })
      botLogger.info(
        { offer: { id: offerId }, swap: swapWithId, swapPost: assoc('id', id, data) },
        'added swap post to Firestore'
      )
    } else {
      botLogger.info({ offer: { id: offerId }, swap: swapWithId }, 'swap post already exists, nothing to do')
    }
  }
}
