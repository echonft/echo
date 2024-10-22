import { getCollection } from '@echo/firestore/crud/collection/get-collection'
import { getCollectionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collections-collection-reference'
import { generateUniqueCollectionSlug } from '@echo/firestore/helpers/collection/generate-unique-collection-slug'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { CollectionError } from '@echo/model/constants/errors/collection-error'
import { type Collection } from '@echo/model/types/collection/collection'
import { assoc, isNil } from 'ramda'

export async function addCollection(args: Collection): Promise<NewDocument<Collection>> {
  const uniqueSlug = await generateUniqueCollectionSlug(args.slug)
  const collectionBySlug = await getCollection(uniqueSlug)
  if (!isNil(collectionBySlug)) {
    return Promise.reject(Error(CollectionError.Exists))
  }
  const data = assoc('slug', uniqueSlug, args)
  const id = await setReference({
    collectionReference: getCollectionsCollectionReference(),
    data
  })
  return { id, data }
}
