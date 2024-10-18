import type { SearchResultCategory } from '@echo/model/constants/search-result-category'
import type { WithId } from '@echo/model/types/with-id'

export interface SearchResult<T> extends WithId {
  category: SearchResultCategory
  label: string
  pictureUrl: string
  value: T
}
