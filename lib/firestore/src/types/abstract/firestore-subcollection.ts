import { FirestoreData } from '../model'

export interface FirestoreSubcollection<T extends FirestoreData> {
  path: string
  data: T[] | undefined
}
