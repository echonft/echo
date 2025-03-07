'use server'
import { getUsersSearchData } from '@echo/firestore/crud/user/get-users-search-data'
import { initializeFirestore } from '@echo/firestore/services/initialize-firestore'
import { userToSearchResult } from '@echo/model/mappers/user/user-to-search-result'
import type { SearchResult } from '@echo/model/types/search-result'
import { andThen, filter, map, pipe, propSatisfies, test, toLower } from 'ramda'

export async function searchUsers(query: string): Promise<SearchResult[]> {
  await initializeFirestore()
  const regex = new RegExp(toLower(query), 'ig')
  const search = pipe(toLower, test(regex))
  return pipe(getUsersSearchData, andThen(pipe(filter(propSatisfies(search, 'username')), map(userToSearchResult))))()
}
