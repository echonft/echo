import { ListingFiltersQueryParams } from '../../types/request/listing-filters-query-params'
import { ListingQueryFilters } from '@echo/firestore-types'
import { modifyBooleanPropToString } from '@echo/utils/src/fp/modify-boolean-prop-to-string'

export function mapListingFiltersToQueryParams(filters: ListingQueryFilters): ListingFiltersQueryParams {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return modifyBooleanPropToString('includedExpired', filters)
}
