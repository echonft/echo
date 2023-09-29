import type { QueryType } from '@echo/utils/types/query-type'

export interface CollectionFiltersQueryParams extends QueryType {
  includeSwapsCount?: string
}
