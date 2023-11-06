import { type ApiRequest } from '@echo/api/types/api-request'
import { guarded_addParamFromRequest } from '@echo/frontend/lib/server/helpers/request/guarded_add-param-from-request'
import { type CollectionQueryFilters } from '@echo/frontend/lib/server/types/request/collection-query-filters'
import { booleanQueryParamSchema } from '@echo/frontend/lib/server/validators/boolean-query-param-schema'
import { propIsEmpty } from '@echo/utils/fp/prop-is-empty'
import { always, modify, pipe, prop, when } from 'ramda'

export function parseCollectionFiltersQuery<T>(request: ApiRequest<T>) {
  return pipe(
    guarded_addParamFromRequest('includeSwapsCount', booleanQueryParamSchema),
    when(propIsEmpty('params'), modify('params', always(undefined))),
    prop('params')
  )({
    request,
    params: {} as CollectionQueryFilters
  })
}
