import { type ListingFiltersQueryParams } from '@echo/api/types/requests/params/listing-filters-query-params'
import { type ListingQueryFilters } from '@echo/firestore/types/query/listing-query-filters'
import { modifyBooleanPropToString } from '@echo/utils/fp/modify-boolean-prop-to-string'

export function mapListingFiltersToQueryParams(filters: ListingQueryFilters): ListingFiltersQueryParams {
  return modifyBooleanPropToString('includeExpired', filters)
}
