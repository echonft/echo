import { onSnapshot, Query, QuerySnapshot, Unsubscribe } from 'firebase/firestore'

export const subscribeToQuery = <T>(query: Query<T>, onNext: (snapshot: QuerySnapshot<T>) => void): Unsubscribe =>
  onSnapshot<T>(query, onNext)
