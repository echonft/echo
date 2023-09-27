import type { ApiRequest } from '@echo/api/types/base/api-request'
import type { GetCollectionsResponse } from '@echo/api/types/responses/get-collections-response'
import { CollectionResponse } from '@echo/api/types/responses/model/collection-response'
import type { FirestoreNftCollectionSwapsCount } from '@echo/firestore/types/model/nft-collection-swaps-count/firestore-nft-collection-swaps-count'
import { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { getAllCollectionSwapsCounts } from '@server/helpers/collection/get-all-collection-swaps-counts'
import { getAllCollections } from '@server/helpers/collection/get-all-collections'
import { parseCollectionFiltersQuery } from '@server/helpers/request/parse-collection-filters-query'
import { parseConstraintsQuery } from '@server/helpers/request/parse-constraints-query'
import { mapCollectionToResponse } from '@server/mappers/to-response/map-collection-to-response'
import { NextResponse } from 'next/server'
import {
  always,
  anyPass,
  ascend,
  assoc,
  converge,
  descend,
  dissoc,
  find,
  identity,
  ifElse,
  isNil,
  map,
  pipe,
  prop,
  propEq,
  slice,
  sort,
  unless
} from 'ramda'

function getSwapsCountForCollection(collectionId: string, swapsCounts: Array<FirestoreNftCollectionSwapsCount>) {
  const swapsCount = find(propEq(collectionId, 'collectionId'), swapsCounts)
  if (isNil(swapsCount)) {
    return 0
  }
  return swapsCount.swapsCount
}

export async function getAllCollectionsRequestHandler(req: ApiRequest<never>) {
  const constraints = parseConstraintsQuery(req)
  const filters = parseCollectionFiltersQuery(req)
  const includeSwapsCount = isNil(filters) ? false : filters.includeSwapsCount
  // we need to remove limit and offset constraints if swaps counts are included - it will be done after manually on the list
  // TODO limitToLast, if needed - it's not for now
  // we do not need to remove any orderBy or select constraints - they will just be ignored
  const collections = await pipe(
    ifElse<
      [{ constraints: QueryConstraints | undefined; includeSwapsCount: boolean }],
      QueryConstraints | undefined,
      QueryConstraints
    >(
      anyPass([propIsNil('constraints'), propEq(false, 'includeSwapsCount')]),
      prop('constraints'),
      pipe(prop<QueryConstraints>('constraints'), dissoc('limit'), dissoc('offset'))
    ),
    getAllCollections
  )({ constraints, includeSwapsCount })
  if (includeSwapsCount) {
    const swapCounts = await getAllCollectionSwapsCounts()
    const sliceStartIndex = !isNil(constraints) && !isNil(constraints.offset) ? constraints.offset : 0
    const sliceEndIndex =
      !isNil(constraints) && !isNil(constraints.limit) ? constraints.limit + sliceStartIndex : collections.length
    const orderBy =
      !isNil(constraints) && !isNil(constraints.orderBy)
        ? map(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            ifElse(
              propEq('asc', 'direction'),
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              pipe(prop('field'), prop, ascend, sort),
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              pipe(prop('field'), prop, descend, sort)
            ),
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            constraints.orderBy
          )
        : undefined

    return NextResponse.json<GetCollectionsResponse>({
      collections: pipe(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        map(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          converge(assoc('swapsCount'), [
            converge(getSwapsCountForCollection, [prop('id'), always(swapCounts)]),
            identity
          ])
        ),
        slice(sliceStartIndex, sliceEndIndex),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        unless(always(isNil(orderBy)), pipe(...orderBy)),
        map(mapCollectionToResponse)
      )(collections) as CollectionResponse[]
    })
  }
  return NextResponse.json<GetCollectionsResponse>({ collections: map(mapCollectionToResponse, collections) })
}
