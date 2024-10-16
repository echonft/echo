import { SEARCH_RESULT_CATEGORY_COLLECTION } from '@echo/model/constants/search-result-category'
import type { Collection } from '@echo/model/types/collection/collection'
import type { SearchResult } from '@echo/model/types/search/search-result'
import type { Slug } from '@echo/model/types/slug'
import { always, applySpec, concat, pipe, prop } from 'ramda'

export function mapCollectionToSearchResult(collection: Collection): SearchResult<Slug> {
  return applySpec<SearchResult<Slug>>({
    category: always(SEARCH_RESULT_CATEGORY_COLLECTION),
    label: prop('name'),
    id: pipe<[Collection], string, string>(prop('slug'), concat(`${SEARCH_RESULT_CATEGORY_COLLECTION}-`)),
    pictureUrl: prop('profilePictureUrl'),
    value: prop('slug')
  })(collection)
}
