import { type FirestoreEventChangeSnapshotDataReturn } from '@echo/firestore-functions/firestore-triggers/helpers/firestore-event-change-snapshot-data'
import type { Nullable } from '@echo/utils/types/nullable'
import { equals, isNil, prop as ramdaProp } from 'ramda'

export interface FirestoreEventChangeSnapshotPropUpdatedReturn<AppModelType, K extends keyof AppModelType> {
  after: Nullable<AppModelType[K]>
  before: Nullable<AppModelType[K]>
  updated: boolean
}

export function changeSnapshotDataPropUpdated<AppModelType, K extends keyof AppModelType>(
  { after, before }: FirestoreEventChangeSnapshotDataReturn<AppModelType>,
  prop: K,
  comparator: (valA: AppModelType[K], valB: AppModelType[K]) => boolean = equals<AppModelType[K]>
): FirestoreEventChangeSnapshotPropUpdatedReturn<AppModelType, K> {
  if (isNil(after)) {
    if (isNil(before)) {
      return {
        after: undefined,
        before: undefined,
        updated: false
      }
    }
    const beforeProp: AppModelType[K] = ramdaProp(prop, before)
    return {
      after: undefined,
      before: beforeProp,
      updated: !isNil(beforeProp)
    }
  }
  if (isNil(before)) {
    const afterProp: AppModelType[K] = ramdaProp(prop, after)
    return {
      after: afterProp,
      before: undefined,
      updated: !isNil(afterProp)
    }
  }
  const afterProp: AppModelType[K] = ramdaProp(prop, after)
  const beforeProp: AppModelType[K] = ramdaProp(prop, before)
  return {
    after: afterProp,
    before: beforeProp,
    updated: !comparator(afterProp, beforeProp)
  }
}
