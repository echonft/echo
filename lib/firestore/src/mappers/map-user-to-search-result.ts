import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { SEARCH_RESULT_CATEGORY_USER } from '@echo/model/constants/search-result-category'
import type { SearchResult } from '@echo/model/types/search-result'
import { always, applySpec, concat, path, pipe, prop } from 'ramda'

export function mapUserToSearchResult(user: UserDocumentData): SearchResult<string> {
  return applySpec<SearchResult<string>>({
    category: always(SEARCH_RESULT_CATEGORY_USER),
    label: path(['discord', 'username']),
    id: pipe<[UserDocumentData], string, string>(prop('username'), concat(`${SEARCH_RESULT_CATEGORY_USER}-`)),
    pictureUrl: path(['discord', 'avatarUrl']),
    value: prop('username')
  })(user)
}
