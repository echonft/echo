import { getSwapPostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-swap-posts-collection-reference'
import { getQueryUniqueData } from '@echo/firestore/helpers/crud/query/get-query-unique-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { SwapPostDocumentData } from '@echo/firestore/types/model/swap-post/swap-post-document-data'
import type { Nullable } from '@echo/utils/types/nullable'
import { pipe } from 'ramda'

export function getSwapPost(args: { swapId: string; guildId: string }): Promise<Nullable<SwapPostDocumentData>> {
  const { swapId, guildId } = args
  return pipe(
    getSwapPostsCollectionReference,
    queryWhere('swapId', '==', swapId),
    queryWhere('guild.id', '==', guildId),
    getQueryUniqueData
  )()
}
