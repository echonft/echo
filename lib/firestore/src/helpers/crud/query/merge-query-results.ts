import { Query } from 'firebase-admin/firestore'
import { concat, eqProps, pipe, uniqWith } from 'ramda'

export async function mergeQueryResults<T extends Record<'id', string>>(
  queryA: Query<T>,
  queryB: Query<T>,
  resultFetcher: (query: Query<T>) => Promise<T[]>
) {
  const resultsA = await resultFetcher(queryA)
  const resultsAB = await resultFetcher(queryB)
  return pipe<[T[], T[]], T[], T[]>(concat, uniqWith(eqProps('id')))(resultsA, resultsAB)
}
