import { getSearchParam } from '@echo/backend/request-handlers/get-search-param'
import { toNextReponse } from '@echo/backend/request-handlers/to-next-reponse'
import type { RequestHandlerArgs } from '@echo/backend/types/request-handler'
import { getCollectionsSearchData } from '@echo/firestore/crud/collection/get-collections-search-data'
import { collectionToSearchResult } from '@echo/model/mappers/collection/collection-to-search-result'
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
        map(collectionToSearchResult),
        objOf('results'),
        toNextReponse
      )
    )
  )()
}
