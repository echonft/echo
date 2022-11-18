import { FirebaseDocument } from '../paths/document-path'

export class FirebaseMapperError extends Error {
  constructor(id: string, collection: FirebaseDocument, error?: any) {
    super(`Error mapping ${id} in ${collection} ${error && `: ${error}`}`)
  }
}
