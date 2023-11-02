import type { Collection } from '@echo/model/types/collection'

export const COLLECTION_CONTEXT_NAME = 'collection' as const
export function collectionContext(collection: Partial<Collection>) {
  return {
    [COLLECTION_CONTEXT_NAME]: collection
  }
}
