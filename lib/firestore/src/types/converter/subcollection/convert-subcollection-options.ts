import { QueryConstraint } from 'firebase/firestore'

export interface ConvertSubcollectionOptions {
  getDocs: boolean
  constraints?: QueryConstraint[]
}
