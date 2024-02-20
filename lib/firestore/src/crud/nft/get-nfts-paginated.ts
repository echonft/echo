import { PAGE_SIZE } from '@echo/firestore/constants/page-size'
import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryLimit } from '@echo/firestore/helpers/crud/query/query-limit'
import { queryOffset } from '@echo/firestore/helpers/crud/query/query-offset'
import { setPaginatedResult } from '@echo/firestore/helpers/pagination/set-paginated-result'
import type { PaginatedArgs } from '@echo/firestore/types/paginated-args'
import type { PaginatedResult } from '@echo/firestore/types/paginated-result'
import type { Nft } from '@echo/model/types/nft'
import { andThen, partial, pipe } from 'ramda'

export function getNftsPaginated(args: PaginatedArgs): Promise<PaginatedResult<Nft>> {
  const { page } = args
  return pipe(
    getNftsCollectionReference,
    queryLimit(PAGE_SIZE),
    queryOffset(page * PAGE_SIZE),
    getQueryData,
    andThen(partial(setPaginatedResult, [page]))
  )()
}
