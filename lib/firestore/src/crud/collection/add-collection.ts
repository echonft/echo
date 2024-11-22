import { getCollectionByContract } from '@echo/firestore/crud/collection/get-collection-by-contract'
import { collectionsCollection } from '@echo/firestore/helpers/collection/collections'
import { setReference } from '@echo/firestore/helpers/reference/set-reference'
import type { CollectionDocument } from '@echo/firestore/types/model/collection-document'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { CollectionError } from '@echo/model/constants/errors/collection-error'
import { type Collection } from '@echo/model/types/collection'
import { isNil } from 'ramda'

export async function addCollection(data: Collection): Promise<NewDocument<CollectionDocument>> {
  const existingCollection = await getCollectionByContract(data.contract)
  if (!isNil(existingCollection)) {
    return Promise.reject(Error(CollectionError.Exists))
  }
  const id = await setReference({
    collectionReference: collectionsCollection(),
    data
  })
  return { id, data }
}
