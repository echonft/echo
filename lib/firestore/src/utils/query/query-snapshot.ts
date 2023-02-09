import { FirestoreQuery } from '../../types'
import { DocumentData, getDocs, QuerySnapshot } from 'firebase/firestore'

export const querySnapshot: <T extends DocumentData>(query: FirestoreQuery<T>) => Promise<QuerySnapshot<T>> = getDocs
