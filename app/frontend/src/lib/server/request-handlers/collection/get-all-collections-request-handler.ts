import { type ApiRequest } from '@echo/api/types/api-request'
import { type CollectionsResponse } from '@echo/api/types/responses/collections-response'
import { type CollectionSwapsCount } from '@echo/firestore/types/model/collection-swaps-count/collection-swaps-count'
import { type QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { getAllCollectionSwapsCounts } from '@echo/frontend/lib/server/helpers/collection/get-all-collection-swaps-counts'
import { getAllCollections } from '@echo/frontend/lib/server/helpers/collection/get-all-collections'
import { parseCollectionFiltersQuery } from '@echo/frontend/lib/server/helpers/request/parse-collection-filters-query'
import { parseConstraintsQuery } from '@echo/frontend/lib/server/helpers/request/parse-constraints-query'
import { type Collection } from '@echo/model/types/collection'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { NextResponse } from 'next/server'
import {
  add,
  always,
  anyPass,
  ascend,
  assoc,
  complement,
  converge,
  descend,
  dissoc,
  find,
  has,
  identity,
  ifElse,
  isNil,
  length,
  map,
  none,
  path,
  pipe,
  prop,
  propEq,
  slice,
  sortBy
} from 'ramda'

function getSwapsCountForCollection(collectionId: string, swapsCounts: CollectionSwapsCount[]) {
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      pipe(prop('constraints'), dissoc('limit'), dissoc('offset'))
    ),
    getAllCollections
  )({ constraints, includeSwapsCount })
  if (includeSwapsCount) {
    const swapCounts = await getAllCollectionSwapsCounts()
    const sliceStartIndex = ifElse(anyPass([isNil, complement(has('offset'))]), always(0), prop('offset'))(constraints)
    const sliceEndIndex = ifElse<
      [{ constraints: QueryConstraints | undefined; collections: Collection[]; sliceStartIndex: number }],
      number,
      number
    >(
      anyPass([pipe(prop('constraints'), isNil), pipe(prop('constraints'), complement(has('limit')))]),
      pipe(prop('collections'), length),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      converge(add, [path(['constraints', 'limit']), prop('sliceStartIndex')])
    )({ constraints, collections, sliceStartIndex })
    const orderBy = ifElse(
      anyPass([isNil, complement(has('orderBy')), pipe(prop('orderBy'), none(propEq('swapsCount', 'field')))]),
      always(identity),
      pipe(
        prop('orderBy'),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        find(propEq('swapsCount', 'field')),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ifElse(
          propEq('asc', 'direction'),
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          always(sortBy(ascend(prop('swapsCount')))),
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          always(sortBy(descend(prop('swapsCount'))))
        )
      )
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
    )(constraints)

    return NextResponse.json<CollectionsResponse>({
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
        orderBy
      )(collections) as Collection[]
    })
  }
  return NextResponse.json<CollectionsResponse>({ collections })
}
