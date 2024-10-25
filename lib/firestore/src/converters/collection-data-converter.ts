import type { CollectionDocumentData } from '@echo/firestore/types/model/collection-document-data'
import type { Collection } from '@echo/model/types/collection'
import { QueryDocumentSnapshot, type WithFieldValue } from 'firebase-admin/firestore'
import { assoc, has, invoker, pipe, unless } from 'ramda'

export const collectionDataConverter = {
  fromFirestore(snapshot: QueryDocumentSnapshot<CollectionDocumentData, CollectionDocumentData>): Collection {
    return pipe(
      invoker(0, 'data'),
      unless<CollectionDocumentData, CollectionDocumentData>(has('description'), assoc('description', undefined)),
      unless<CollectionDocumentData, CollectionDocumentData>(has('discordUrl'), assoc('discordUrl', undefined)),
      unless<CollectionDocumentData, CollectionDocumentData>(
        has('profilePictureUrl'),
        assoc('profilePictureUrl', undefined)
      ),
      unless<CollectionDocumentData, CollectionDocumentData>(
        has('twitterUsername'),
        assoc('twitterUsername', undefined)
      ),
      unless<CollectionDocumentData, CollectionDocumentData>(has('websiteUrl'), assoc('websiteUrl', undefined))
    )(snapshot)
  },
  toFirestore(modelObject: WithFieldValue<Collection>): WithFieldValue<CollectionDocumentData> {
    return modelObject
  }
}
