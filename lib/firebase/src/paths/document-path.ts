import { isNil } from 'rambda'

export enum FirebaseDocument {
  COLLECTIONS = 'collections',
  USERS = 'users',
  OFFERS = 'offers'
}

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
