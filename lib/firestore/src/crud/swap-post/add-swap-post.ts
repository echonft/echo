import { getSwapPost } from '@echo/firestore/crud/swap-post/get-swap-post'
import { getSwapById } from '@echo/firestore/crud/swap/get-swap-by-id'
import { getSwapPostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-swap-posts-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { SwapPostDocumentData } from '@echo/firestore/types/model/swap-post-document-data'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { SwapError } from '@echo/model/constants/errors/swap-error'
import { isNil } from 'ramda'

export async function addSwapPost(data: SwapPostDocumentData): Promise<NewDocument<SwapPostDocumentData>> {
  const swap = await getSwapById(data.swapId)
  if (isNil(swap)) {
    return Promise.reject(Error(SwapError.NotFound))
  }
  const swapPost = await getSwapPost({ swapId: data.swapId, guildId: data.guild.id })
  if (!isNil(swapPost)) {
    return Promise.reject(Error(SwapError.PostExists))
  }
  const id = await setReference<SwapPostDocumentData, SwapPostDocumentData>({
    collectionReference: getSwapPostsCollectionReference(),
    data
  })
  return { id, data }
}
