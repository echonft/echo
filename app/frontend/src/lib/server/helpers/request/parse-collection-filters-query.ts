import { type ApiRequest } from '@echo/api/types/api-request'
import { type CollectionQueryFilters } from '@echo/firestore/types/query/collection-query-filters'
import { addParamFromRequest } from '@echo/frontend/lib/server/helpers/request/add-param-from-request'
import { booleanQueryParamSchema } from '@echo/frontend/lib/server/validators/boolean-query-param-schema'
import { propIsEmpty } from '@echo/utils/fp/prop-is-empty'
import { always, modify, pipe, prop, when } from 'ramda'

export function parseCollectionFiltersQuery<T>(request: ApiRequest<T>) {
  return pipe(
    addParamFromRequest('includeSwapsCount', booleanQueryParamSchema),
    when(propIsEmpty('params'), modify('params', always(undefined))),
    prop('params')
  )({
    request,
    params: {} as CollectionQueryFilters
  })
}
