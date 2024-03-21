import { getSwapPostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-swap-posts-collection-reference'
import { getQueryUniqueData } from '@echo/firestore/helpers/crud/query/get-query-unique-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { SwapPost } from '@echo/firestore/types/model/swap-post/swap-post'
import type { Nullable } from '@echo/utils/types/nullable'
import { pipe } from 'ramda'

export function findSwapPost(swapId: string, guildId: string): Promise<Nullable<SwapPost>> {
  return pipe(
    getSwapPostsCollectionReference,
    queryWhere<SwapPost>('swapId', '==', swapId),
    queryWhere<SwapPost>('guild.discordId', '==', guildId),
    getQueryUniqueData
  )()
}
