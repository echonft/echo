import type { CollectionDocumentData } from '@echo/firestore/types/model/collection/collection-document-data'
import type { Collection } from '@echo/model/types/collection'
import { removeSpecialCharacters } from '@echo/utils/fp/remove-special-characters'
import type { FieldValue, WithFieldValue } from 'firebase-admin/firestore'
import { modify, pipe, toLower } from 'ramda'

export function normalizeSlug<T extends CollectionDocumentData | WithFieldValue<Collection>>(obj: T): T {
  return modify(
    'slug',
    pipe<[FieldValue | Lowercase<string>], Lowercase<string>, Lowercase<string>>(toLower, removeSpecialCharacters),
    obj
  ) as T
}
