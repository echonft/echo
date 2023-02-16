import { FirestorePath } from '@echo/firebase'
import { isEmpty, isNil } from 'rambda'

export class FirebaseDocumentError extends Error {
  constructor(id: string, collection: FirebaseDocument, error?: string) {
    super(`${id} does not exist in ${collection} ${!isNil(error) && !isEmpty(error) ? `: ${error}` : ''}`)
  }
}
