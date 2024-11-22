import { SearchResultCategory } from '@echo/model/constants/search-result-category'
import type { Collection } from '@echo/model/types/collection'
import type { SearchResult } from '@echo/model/types/search-result'
import { always, applySpec, concat, pipe, prop } from 'ramda'

export function collectionToSearchResult(collection: Collection): SearchResult {
  return applySpec<SearchResult>({
    category: always(SearchResultCategory.Collection),
    label: prop('name'),
    id: pipe<[Collection], string, string>(prop('slug'), concat(`${SearchResultCategory.Collection}-`)),
    pictureUrl: prop('pictureUrl'),
    value: prop('slug')
  })(collection)
}
