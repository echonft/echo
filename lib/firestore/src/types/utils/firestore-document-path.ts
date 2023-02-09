import { FirebaseDocumentName } from './firebase-document-name'
import { isNil } from 'ramda'

/**
 * Util to change document to path
 * @param collection The collection name
 */
export function documentPath(collection: FirebaseDocumentName | undefined): string {
  if (isNil(collection)) {
    throw Error(`documentPath called with a null collection`)
  }
  return `${collection}/`
}
