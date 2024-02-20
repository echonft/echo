import { PAGE_SIZE } from '@echo/firestore/constants/page-size'
import { getUsersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-users-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryLimit } from '@echo/firestore/helpers/crud/query/query-limit'
import { queryOffset } from '@echo/firestore/helpers/crud/query/query-offset'
import { setPaginatedResult } from '@echo/firestore/helpers/pagination/set-paginated-result'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import type { PaginatedArgs } from '@echo/firestore/types/paginated-args'
import type { PaginatedResult } from '@echo/firestore/types/paginated-result'
import { andThen, partial, pipe } from 'ramda'

export function getUsersPaginated(args: PaginatedArgs): Promise<PaginatedResult<UserDocumentData>> {
  const { page } = args
  return pipe(
    getUsersCollectionReference,
    queryLimit(PAGE_SIZE),
    queryOffset(page * PAGE_SIZE),
    getQueryData,
    andThen(partial(setPaginatedResult, [page]))
  )()
}
