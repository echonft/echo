import { getCollection, getCollectionSnapshot } from '@echo/firestore/crud/collection/get-collection'
import { collectionsCollection } from '@echo/firestore/helpers/collection/collections'
import { setReference } from '@echo/firestore/helpers/reference/set-reference'
import type { CollectionDocument } from '@echo/firestore/types/model/collection-document'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { CollectionError } from '@echo/model/constants/errors/collection-error'
import { type Collection } from '@echo/model/types/collection'
import type { Slug } from '@echo/model/types/slug'
import { assoc, inc, isNil, modify, pipe, toLower } from 'ramda'

interface InnerGenerateUniqueCollectionSlugArgs {
  slug: Slug
  index: number
}

async function innerGenerateUniqueCollectionSlug(args: InnerGenerateUniqueCollectionSlugArgs): Promise<Slug> {
  const slug = args.index === 0 ? args.slug : toLower(`${args.slug}-${args.index}`)
  const snapshot = await getCollectionSnapshot(slug)
  if (isNil(snapshot)) {
    return slug
  }
  return pipe<[InnerGenerateUniqueCollectionSlugArgs], InnerGenerateUniqueCollectionSlugArgs, Promise<Slug>>(
    modify('index', inc),
    innerGenerateUniqueCollectionSlug
  )(args)
}

function generateUniqueCollectionSlug(slug: Slug) {
  return innerGenerateUniqueCollectionSlug({ slug, index: 0 })
}

export async function addCollection(args: Collection): Promise<NewDocument<CollectionDocument>> {
  const uniqueSlug = await generateUniqueCollectionSlug(args.slug)
  const collectionBySlug = await getCollection(uniqueSlug)
  if (!isNil(collectionBySlug)) {
    return Promise.reject(Error(CollectionError.Exists))
  }
  const data = assoc('slug', uniqueSlug, args)
  const id = await setReference({
    collectionReference: collectionsCollection(),
    data
  })
  return { id, data }
}
