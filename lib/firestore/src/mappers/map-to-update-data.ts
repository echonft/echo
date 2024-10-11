import type { DeepPartial } from '@echo/utils/types/deep-partial'
import { FieldValue, type Primitive, type UpdateData } from 'firebase-admin/firestore'
import { is, isNil, map, mapObjIndexed } from 'ramda'

type TransformResult<T> = T extends Primitive
  ? T | FieldValue
  : T extends (infer U)[]
    ? TransformResult<U>[]
    : { [K in keyof T]?: TransformResult<T[K]> }
type DeepPartialOrPartial<T> = DeepPartial<T> | Partial<T>

export function mapToUpdateData<T>(obj: DeepPartial<T> | Partial<T>): UpdateData<T> {
  const transform = <U>(value: DeepPartialOrPartial<U>): TransformResult<U> => {
    if (isNil(value)) {
      return FieldValue.delete() as TransformResult<U>
    }
    if (is(Object, value)) {
      return mapObjIndexed(
        (v) => transform(v as DeepPartialOrPartial<unknown>),
        value as Record<string, unknown>
      ) as TransformResult<U>
    }
    if (Array.isArray(value)) {
      return map((v) => transform(v as DeepPartialOrPartial<unknown>), value) as TransformResult<U>
    }
    return value as TransformResult<U>
  }

  return transform(obj) as UpdateData<T>
}
