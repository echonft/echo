import { toSlug } from '@echo/model/helpers/to-slug'
import type { Collection } from '@echo/model/types/collection'
import type { WithSlug } from '@echo/model/types/with-slug'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { modify } from 'ramda'

export function normalizeSlug<T extends Collection | WithFieldValue<Collection>>(obj: T): T {
  return modify('slug', toSlug, obj as WithSlug) as T
}
