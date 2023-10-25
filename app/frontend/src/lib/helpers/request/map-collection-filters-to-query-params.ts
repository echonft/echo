import { type CollectionQueryFilters } from '@echo/frontend/lib/server/types/request/collection-query-filters'
import { type CollectionFiltersQueryParams } from '@echo/frontend/lib/types/request/collection-filters-query-params'
import { modifyBooleanPropToString } from '@echo/utils/fp/modify-boolean-prop-to-string'

export function mapCollectionFiltersToQueryParams(filters: CollectionQueryFilters): CollectionFiltersQueryParams {
  return modifyBooleanPropToString('includeSwapsCount', filters)
}
