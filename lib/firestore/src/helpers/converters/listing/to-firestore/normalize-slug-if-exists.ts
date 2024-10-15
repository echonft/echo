import { normalizeSlug } from '@echo/firestore/helpers/converters/listing/normalize-slug'
import type { ListingDocumentData } from '@echo/firestore/types/model/listing/listing-document-data'
import { whenHas } from '@echo/utils/fp/when-has'
import type { WithFieldValue } from 'firebase-admin/firestore'

export function normalizeSlugIfExists(obj: WithFieldValue<ListingDocumentData>): WithFieldValue<ListingDocumentData> {
  return whenHas('slug', normalizeSlug, obj)
}
