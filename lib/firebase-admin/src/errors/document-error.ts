import { FirebaseDocument } from '@echo/firebase/paths/document-path'

export class FirebaseDocumentError extends Error {
  constructor(id: string, collection: FirebaseDocument, error?: any) {
    super(`${id} does not exist in ${collection} ${error && `: ${error}`}`)
  }
}
