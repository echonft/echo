import { type ListingQueryFilters } from '@echo/firestore/types/query/listing-query-filters'
import { type ListingFiltersQueryParams } from '@echo/frontend/lib/types/request/listing-filters-query-params'
import { modifyBooleanPropToString } from '@echo/utils/fp/modify-boolean-prop-to-string'

export function mapListingFiltersToQueryParams(filters: ListingQueryFilters): ListingFiltersQueryParams {
  return modifyBooleanPropToString('includeExpired', filters)
}
