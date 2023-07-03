import { QueryConstraint } from 'firebase/firestore'

export type UseCollectionOptions = {
  constraints?: QueryConstraint[]
  listen?: boolean
  suspense?: boolean
}
