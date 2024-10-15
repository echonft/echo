import type { ListingDocumentData } from '@echo/firestore/types/model/listing-document-data'
import { toSlug } from '@echo/model/helpers/to-slug'
import type { Listing } from '@echo/model/types/listing'
import type { WithSlug } from '@echo/model/types/with-slug'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { modify } from 'ramda'

export function normalizeSlug<T extends Listing | WithFieldValue<ListingDocumentData>>(obj: T): T {
  return modify('slug', toSlug, obj as WithSlug) as T
}
