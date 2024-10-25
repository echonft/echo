import { swapPostsCollection } from '@echo/firestore/helpers/collection/collections'
import { getQueryUniqueData } from '@echo/firestore/helpers/query/get-query-unique-data'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import type { SwapPostDocument } from '@echo/firestore/types/model/swap-post-document'
import type { Nullable } from '@echo/utils/types/nullable'
import { pipe } from 'ramda'

export function getSwapPost(args: { swapId: string; guildId: string }): Promise<Nullable<SwapPostDocument>> {
  const { swapId, guildId } = args
  return pipe(
    swapPostsCollection,
    queryWhere('swapId', '==', swapId),
    queryWhere('guild.id', '==', guildId),
    getQueryUniqueData
  )()
}
