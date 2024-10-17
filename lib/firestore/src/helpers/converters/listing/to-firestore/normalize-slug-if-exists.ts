import { normalizeSlug } from '@echo/firestore/helpers/converters/listing/normalize-slug'
import type { ListingDocumentData } from '@echo/firestore/types/model/listing-document-data'
import type { Listing } from '@echo/model/types/listing/listing'
import { whenHas } from '@echo/utils/fp/when-has'
import type { WithFieldValue } from 'firebase-admin/firestore'

export function normalizeSlugIfExists<T extends WithFieldValue<Listing> | WithFieldValue<ListingDocumentData>>(
  obj: T
): T {
  return whenHas('slug', normalizeSlug, obj)
}
