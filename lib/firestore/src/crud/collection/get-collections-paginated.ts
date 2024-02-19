import { PAGE_SIZE } from '@echo/firestore/constants/page-size'
import { getCollectionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collections-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryLimit } from '@echo/firestore/helpers/crud/query/query-limit'
import { queryOffset } from '@echo/firestore/helpers/crud/query/query-offset'
import { setPaginatedResult } from '@echo/firestore/helpers/pagination/set-paginated-result'
import type { PaginatedArgs } from '@echo/firestore/types/paginated-args'
import type { PaginatedResult } from '@echo/firestore/types/paginated-result'
import type { Collection } from '@echo/model/types/collection'
import { andThen, partial, pipe } from 'ramda'

export function getCollectionsPaginated(args: PaginatedArgs): Promise<PaginatedResult<Collection>> {
  const { page } = args
  return pipe(
    getCollectionsCollectionReference,
    queryLimit(PAGE_SIZE),
    queryOffset(page * PAGE_SIZE),
    getQueryData,
    andThen(partial(setPaginatedResult, [page]))
  )()
}
