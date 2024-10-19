import { toSlug } from '@echo/model/helpers/to-slug'
import type { Listing } from '@echo/model/types/listing/listing'
import type { WithSlug } from '@echo/model/types/with-slug'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { has, modify } from 'ramda'

export function normalizeSlugIfExists(modelObject: WithFieldValue<Listing>): WithFieldValue<Listing> {
  if (has('slug', modelObject)) {
    return modify('slug', toSlug, modelObject as WithSlug) as WithFieldValue<Listing>
  }
  return modelObject
}
