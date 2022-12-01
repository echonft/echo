import { FirebaseDocument } from '../types'
import { isNil } from 'rambda'

/**
 * Util to change document to path
 * @param collection The collection name
 */
export function documentPath(collection: FirebaseDocument | undefined): string {
  if (isNil(collection)) {
    throw Error(`documentPath called with a null collection`)
  }
  return `${collection}/`
}
