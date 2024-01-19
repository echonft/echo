import { type ApiRequest } from '@echo/api/types/api-request'
import { LISTING_FILTER_AS } from '@echo/firestore/constants/listing/listing-filter-as'
import { assertStateFilters } from '@echo/firestore/helpers/crud/assert/assert-state-filters'
import type { ListingQueryFilters } from '@echo/firestore/types/query/listing-query-filters'
import { addParamFromRequest } from '@echo/frontend/lib/server/helpers/request/add-param-from-request'
import { getStateQueryParamSchema } from '@echo/frontend/lib/server/helpers/request/get-state-query-param-schema'
import { LISTING_STATES } from '@echo/model/constants/listing-states'
import { propIsEmpty } from '@echo/utils/fp/prop-is-empty'
import { always, modify, pipe, prop, when } from 'ramda'
import { z } from 'zod'

export function parseListingFiltersQuery(request: ApiRequest<unknown>) {
  const asQueryParamSchema = z.enum(LISTING_FILTER_AS)
  const stateQueryParamSchema = getStateQueryParamSchema(LISTING_STATES)
  return pipe(
    addParamFromRequest('as', asQueryParamSchema),
    addParamFromRequest('state', stateQueryParamSchema, true),
    addParamFromRequest('notState', stateQueryParamSchema, true),
    when(propIsEmpty('params'), modify('params', always(undefined))),
    prop('params'),
    assertStateFilters(LISTING_STATES)
  )({
    request,
    params: {} as ListingQueryFilters
  })
}
