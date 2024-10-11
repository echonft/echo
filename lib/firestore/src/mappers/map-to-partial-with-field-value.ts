import type { DeepPartial } from '@echo/utils/types/deep-partial'
import { FieldValue, type PartialWithFieldValue } from 'firebase-admin/firestore'
import { is, isNil, map, mapObjIndexed } from 'ramda'

type DeepPartialOrPartial<T> = DeepPartial<T> | Partial<T>

export function mapToPartialWithFieldValue<T>(obj: DeepPartialOrPartial<T>): PartialWithFieldValue<T> {
  const transform = <U>(value: DeepPartialOrPartial<U>): PartialWithFieldValue<U> => {
    if (isNil(value)) {
      return FieldValue.delete() as PartialWithFieldValue<U>
    }
    if (is(Object, value)) {
      return mapObjIndexed((v) => transform(v), value as object) as PartialWithFieldValue<U>
    }
    if (Array.isArray(value)) {
      return map((v: unknown[]) => transform(v), value) as PartialWithFieldValue<U>
    }
    return value as PartialWithFieldValue<U>
  }

  return transform(obj)
}
