import { OfferQueryFilters } from '@echo/firestore/types/query/offer-query-filters'
import { modifyBooleanPropToString } from '@echo/utils/fp/modify-boolean-prop-to-string'
import type { OfferFiltersQueryParams } from '@type/request/offer-filters-query-params'

export function mapOfferFiltersToQueryParams(filters: OfferQueryFilters): OfferFiltersQueryParams {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return modifyBooleanPropToString('includedExpired', filters)
}
