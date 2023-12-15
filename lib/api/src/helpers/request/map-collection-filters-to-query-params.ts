import { type CollectionFiltersQueryParams } from '@echo/api/types/requests/params/collection-filters-query-params'
import type { CollectionQueryFilters } from '@echo/firestore/types/query/collection-query-filters'
import { modifyBooleanPropToString } from '@echo/utils/fp/modify-boolean-prop-to-string'

export function mapCollectionFiltersToQueryParams(filters: CollectionQueryFilters): CollectionFiltersQueryParams {
  return modifyBooleanPropToString('includeSwapsCount', filters)
}
