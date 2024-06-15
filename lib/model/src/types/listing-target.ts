import { type Collection, serializeCollection } from '@echo/model/types/collection'
import { propIsNotNil } from '@echo/utils/fp/prop-is-not-nil'
import type { DeepPartial } from '@echo/utils/types/deep-partial'
import { modify, when } from 'ramda'

export interface ListingTarget {
  collection: Collection
  amount: number
}

export function serializeListingTarget<T extends DeepPartial<ListingTarget>>(target: T): T {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return when(propIsNotNil('collection'), modify('collection', serializeCollection))(target) as T
}
