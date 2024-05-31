import { getCollectionSnapshot } from '@echo/firestore/crud/collection/get-collection'
import { concat, equals } from 'ramda'

async function recursiveFindUniqueCollectionSlug(slug: string, index = 0) {
  const uniqueSLug = equals(0, index) ? slug : concat(slug, `${-index}`)
  const snapshot = await getCollectionSnapshot(uniqueSLug)
  if (snapshot?.exists) {
    return await recursiveFindUniqueCollectionSlug(slug, index++)
  }
  return slug
}

export async function generateUniqueCollectionSlug(slug: string) {
  return await recursiveFindUniqueCollectionSlug(slug)
}
