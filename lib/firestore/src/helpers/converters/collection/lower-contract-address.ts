import type { Collection } from '@echo/model/types/collection'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { modifyPath, toLower } from 'ramda'

type Args = WithFieldValue<Collection> | Collection
export function lowerContractAddress<T extends Args>(collection: T): T {
  return modifyPath(['contract', 'address'], toLower, collection)
}
