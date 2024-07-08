import { getCollectionsSearchData } from '@echo/firestore/crud/collection/get-collections-search-data'
import { mapCollectionToSearchResult } from '@echo/firestore/mappers/collection/map-collection-to-search-result'
import { getSearchParam } from '@echo/frontend/lib/request-handlers/get-search-param'
import { toNextReponse } from '@echo/frontend/lib/request-handlers/to-next-reponse'
import type { RequestHandlerArgs } from '@echo/frontend/lib/types/request-handlers/request-handler'
import { andThen, either, filter, map, objOf, pipe, propSatisfies, test, toLower } from 'ramda'

export async function searchCollectionsRequestHandler({ req }: RequestHandlerArgs) {
  const query = getSearchParam<string>(req, 'q', true)
  const regex = new RegExp(toLower(query), 'ig')
  const search = pipe(toLower, test(regex))
  return pipe(
    getCollectionsSearchData,
    andThen(
      pipe(
        filter(either(propSatisfies(search, 'name'), propSatisfies(search, 'slug'))),
        map(mapCollectionToSearchResult),
        objOf('results'),
        toNextReponse
      )
    )
  )()
}
