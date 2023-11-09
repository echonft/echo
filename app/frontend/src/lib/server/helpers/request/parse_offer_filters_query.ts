import { type ApiRequest } from '@echo/api/types/api-request'
import { OFFER_FILTER_AS } from '@echo/firestore/constants/offer/offer-filter-as'
import { assertStateFilters } from '@echo/firestore/helpers/crud/assert/assert-state-filters'
import { type OfferQueryFilters } from '@echo/firestore/types/query/offer-query-filters'
import { addParamFromRequest } from '@echo/frontend/lib/server/helpers/request/add-param-from-request'
import { getStateQueryParamSchema } from '@echo/frontend/lib/server/helpers/request/get-state-query-param-schema'
import { booleanQueryParamSchema } from '@echo/frontend/lib/server/validators/boolean-query-param-schema'
import { OFFER_STATES } from '@echo/model/constants/offer-states'
import { propIsEmpty } from '@echo/utils/fp/prop-is-empty'
import { always, modify, pipe, prop, when } from 'ramda'
import { z } from 'zod'

export function parseOfferFiltersQuery(request: ApiRequest<unknown>) {
  const asQueryParamSchema = z.enum(OFFER_FILTER_AS)
  const stateQueryParamSchema = getStateQueryParamSchema(OFFER_STATES)
  return pipe(
    addParamFromRequest('as', asQueryParamSchema),
    addParamFromRequest('state', stateQueryParamSchema, true),
    addParamFromRequest('notState', stateQueryParamSchema, true),
    addParamFromRequest('includeExpired', booleanQueryParamSchema),
    when(propIsEmpty('params'), modify('params', always(undefined))),
    prop('params'),
    assertStateFilters(OFFER_STATES)
  )({
    request,
    params: {} as OfferQueryFilters
  })
}
