import { toSlug } from '@echo/model/helpers/to-slug'
import type { Offer } from '@echo/model/types/offer/offer'
import type { WithSlug } from '@echo/model/types/with-slug'
import { has, modify } from 'ramda'

export function normalizeSlugIfExists(modelObject: Partial<Offer>): Partial<Offer> {
  if (has('slug', modelObject)) {
    return modify('slug', toSlug, modelObject as WithSlug)
  }
  return modelObject
}
