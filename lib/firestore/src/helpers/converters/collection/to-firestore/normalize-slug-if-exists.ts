import { normalizeSlug } from '@echo/firestore/helpers/converters/collection/normalize-slug'
import type { Collection } from '@echo/model/types/collection'
import { whenHas } from '@echo/utils/fp/when-has'
import type { WithFieldValue } from 'firebase-admin/firestore'

export function normalizeSlugIfExists(obj: WithFieldValue<Collection>): WithFieldValue<Collection> {
  return whenHas('slug', normalizeSlug, obj)
}
