import { findSwapById } from '@echo/firestore/crud/swap/find-swap-by-id'
import { getSwapPostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-swap-posts-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { SwapPost, SwapPostDiscordGuild } from '@echo/firestore/types/model/swap-post/swap-post'
import { now } from '@echo/utils/helpers/now'
import { isNil } from 'ramda'

export async function addSwapPost(swapId: string, guild: SwapPostDiscordGuild): Promise<SwapPost> {
  const swap = await findSwapById(swapId)
  if (isNil(swap)) {
    throw Error(`trying to add post for swap with id ${swapId} but this swap does not exist`)
  }
  const data = {
    swapId,
    guild,
    postedAt: now()
  }
  await setReference<SwapPost>({
    collectionReference: getSwapPostsCollectionReference(),
    data
  })
  return data
}
