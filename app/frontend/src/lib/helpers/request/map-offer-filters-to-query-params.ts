import { type OfferQueryFilters } from '@echo/firestore/types/query/offer-query-filters'
import { type OfferFiltersQueryParams } from '@echo/frontend/lib/types/request/offer-filters-query-params'
import { modifyBooleanPropToString } from '@echo/utils/fp/modify-boolean-prop-to-string'

export function mapOfferFiltersToQueryParams(filters: OfferQueryFilters): OfferFiltersQueryParams {
  return modifyBooleanPropToString('includeExpired', filters)
}
