import type { SearchResult } from '@echo/model/types/search-result'

export function compareSearchResults(resultA: SearchResult, resultB: SearchResult): number {
  return resultA.label.localeCompare(resultB.label)
}
