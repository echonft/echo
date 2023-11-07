import { type ApiRequest } from '@echo/api/types/api-request'
import { OFFER_FILTER_AS } from '@echo/firestore/constants/offer-filter-as'
import { type OfferQueryFilters } from '@echo/firestore/types/query/offer-query-filters'
import { guarded_assertStateFilters } from '@echo/frontend/lib/server/helpers/request/assert/guarded_assert-state-filters'
import { getStateQueryParamSchema } from '@echo/frontend/lib/server/helpers/request/get-state-query-param-schema'
import { guarded_addParamFromRequest } from '@echo/frontend/lib/server/helpers/request/guarded_add-param-from-request'
import { booleanQueryParamSchema } from '@echo/frontend/lib/server/validators/boolean-query-param-schema'
import { OFFER_STATES } from '@echo/model/constants/offer-states'
import { propIsEmpty } from '@echo/utils/fp/prop-is-empty'
import { always, modify, pipe, prop, when } from 'ramda'
import { z } from 'zod'

export function guarded_parseOfferFiltersQuery(request: ApiRequest<unknown>) {
  const asQueryParamSchema = z.enum(OFFER_FILTER_AS)
  const stateQueryParamSchema = getStateQueryParamSchema(OFFER_STATES)
  return pipe(
    guarded_addParamFromRequest('as', asQueryParamSchema),
    guarded_addParamFromRequest('state', stateQueryParamSchema, true),
    guarded_addParamFromRequest('notState', stateQueryParamSchema, true),
    guarded_addParamFromRequest('includeExpired', booleanQueryParamSchema),
    when(propIsEmpty('params'), modify('params', always(undefined))),
    prop('params'),
    guarded_assertStateFilters(OFFER_STATES)
  )({
    request,
    params: {} as OfferQueryFilters
  })
}
