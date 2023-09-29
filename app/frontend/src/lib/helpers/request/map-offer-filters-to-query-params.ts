import type { OfferQueryFilters } from '@echo/firestore/types/query/offer-query-filters'
import { modifyBooleanPropToString } from '@echo/utils/fp/modify-boolean-prop-to-string'
import type { OfferFiltersQueryParams } from '@type/request/offer-filters-query-params'

export function mapOfferFiltersToQueryParams(filters: OfferQueryFilters): OfferFiltersQueryParams {
  return modifyBooleanPropToString('includeExpired', filters)
}
