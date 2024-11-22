import type { UserDocument } from '@echo/firestore/types/model/user-document'
import { SearchResultCategory } from '@echo/model/constants/search-result-category'
import type { SearchResult } from '@echo/model/types/search-result'
import type { User } from '@echo/model/types/user'
import { pathIsNil } from '@echo/utils/helpers/path-is-nil'
import { always, applySpec, concat, ifElse, path, pipe, prop } from 'ramda'

export function userToSearchResult(user: Pick<User, 'discord' | 'username'>): SearchResult {
  return applySpec<SearchResult>({
    category: always(SearchResultCategory.User),
    label: ifElse(pathIsNil(['discord', 'globalName']), prop('username'), path(['discord', 'globalName'])),
    id: pipe<[UserDocument], string, string>(prop('username'), concat(`${SearchResultCategory.User}-`)),
    pictureUrl: path(['discord', 'avatarUrl']),
    value: prop('username')
  })(user)
}
