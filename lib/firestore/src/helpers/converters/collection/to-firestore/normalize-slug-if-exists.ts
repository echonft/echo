import { toSlug } from '@echo/model/helpers/to-slug'
import type { Collection } from '@echo/model/types/collection/collection'
import type { WithSlug } from '@echo/model/types/with-slug'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { has, modify } from 'ramda'

export function normalizeSlugIfExists(modelObject: WithFieldValue<Collection>): WithFieldValue<Collection> {
  if (has('slug', modelObject)) {
    return modify('slug', toSlug, modelObject as WithSlug) as WithFieldValue<Collection>
  }
  return modelObject
}
