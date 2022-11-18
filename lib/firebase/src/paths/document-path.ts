export enum FirebaseDocument {
  COLLECTIONS = 'collections',
  USERS = 'users',
  OFFERS = 'offers'
}

/**
 * Util to change document to path
 * @param collection The collection name
 */
export function FirebaseDocumentPath(collection: FirebaseDocument | undefined): string | undefined {
  return collection && `${collection}/`
}
