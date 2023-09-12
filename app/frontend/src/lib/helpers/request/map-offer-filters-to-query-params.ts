import type { OfferQueryFilters } from '@echo/firestore-types'
import modifyBooleanPropToString from '@echo/utils/modify-boolean-prop-to-string'
import type { OfferFiltersQueryParams } from '@type/request/offer-filters-query-params'

export function mapOfferFiltersToQueryParams(filters: OfferQueryFilters): OfferFiltersQueryParams {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return modifyBooleanPropToString('includedExpired', filters)
}
