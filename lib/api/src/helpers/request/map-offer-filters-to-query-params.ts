import { type OfferFiltersQueryParams } from '@echo/api/types/requests/params/offer-filters-query-params'
import { type OfferQueryFilters } from '@echo/firestore/types/query/offer-query-filters'
import { modifyBooleanPropToString } from '@echo/utils/fp/modify-boolean-prop-to-string'

export function mapOfferFiltersToQueryParams(filters: OfferQueryFilters): OfferFiltersQueryParams {
  return modifyBooleanPropToString('includeExpired', filters)
}
