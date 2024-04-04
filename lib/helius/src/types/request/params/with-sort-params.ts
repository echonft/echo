export interface WithSortParams {
  sortBy?: {
    sortBy?: 'created' | 'recent_action' | 'updated' | 'none'
    sortDirection?: 'asc' | 'desc'
  }
  before?: string
  after?: string
}
