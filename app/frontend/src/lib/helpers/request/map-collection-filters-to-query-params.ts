import { modifyBooleanPropToString } from '@echo/utils/fp/modify-boolean-prop-to-string'
import type { CollectionQueryFilters } from '@server/types/request/collection-query-filters'
import type { CollectionFiltersQueryParams } from '@type/request/collection-filters-query-params'

export function mapCollectionFiltersToQueryParams(filters: CollectionQueryFilters): CollectionFiltersQueryParams {
  return modifyBooleanPropToString('includeSwapsCount', filters)
}
