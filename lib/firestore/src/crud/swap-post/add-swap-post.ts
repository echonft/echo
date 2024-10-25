import { getSwapPost } from '@echo/firestore/crud/swap-post/get-swap-post'
import { getSwapById } from '@echo/firestore/crud/swap/get-swap-by-id'
import { swapPostsCollection } from '@echo/firestore/helpers/collection/collections'
import { setReference } from '@echo/firestore/helpers/reference/set-reference'
import type { SwapPostDocument } from '@echo/firestore/types/model/swap-post-document'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { SwapError } from '@echo/model/constants/errors/swap-error'
import { isNil } from 'ramda'

export async function addSwapPost(data: SwapPostDocument): Promise<NewDocument<SwapPostDocument>> {
  const swap = await getSwapById(data.swapId)
  if (isNil(swap)) {
    return Promise.reject(Error(SwapError.NotFound))
  }
  const swapPost = await getSwapPost({ swapId: data.swapId, guildId: data.guild.id })
  if (!isNil(swapPost)) {
    return Promise.reject(Error(SwapError.PostExists))
  }
  const id = await setReference({
    collectionReference: swapPostsCollection(),
    data
  })
  return { id, data }
}
