import { FieldValue } from 'firebase-admin/firestore'
import { always, filter, isNil, mapObjIndexed, pipe } from 'ramda'

export function mapUndefinedPropsToDeleteField<T>(model: Partial<Omit<T, 'id'>>): object {
  return pipe(filter(isNil), mapObjIndexed(always(FieldValue.delete())))(model)
}
