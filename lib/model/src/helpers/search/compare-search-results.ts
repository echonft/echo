import type { SearchResult } from '@echo/model/types/search/search-result'

export function compareSearchResults<T, U>(resultA: SearchResult<T>, resultB: SearchResult<U>): number {
  return resultA.label.localeCompare(resultB.label)
}
