import { OfferFiltersQueryParams } from '../../types/request/offer-filters-query-params'
import { OfferQueryFilters } from '@echo/firestore-types'
import { modifyBooleanPropToString } from '@echo/utils/src/fp/modify-boolean-prop-to-string'

export function mapOfferFiltersToQueryParams(filters: OfferQueryFilters): OfferFiltersQueryParams {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return modifyBooleanPropToString('includedExpired', filters)
}
