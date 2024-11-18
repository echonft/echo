import type { UserDocument } from '@echo/firestore/types/model/user-document'
import { SearchResultCategory } from '@echo/model/constants/search-result-category'
import type { SearchResult } from '@echo/model/types/search-result'
import type { User } from '@echo/model/types/user'
import { always, applySpec, concat, path, pipe, prop } from 'ramda'

export function userToSearchResult(user: Pick<User, 'discord' | 'username'>): SearchResult<string> {
  return applySpec<SearchResult<string>>({
    category: always(SearchResultCategory.User),
    label: path(['discord', 'username']),
    id: pipe<[UserDocument], string, string>(prop('username'), concat(`${SearchResultCategory.User}-`)),
    pictureUrl: path(['discord', 'avatarUrl']),
    value: prop('username')
  })(user)
}
