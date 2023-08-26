import { FieldValue } from 'firebase-admin/firestore'
import { always, filter, isNil, mapObjIndexed, pipe } from 'ramda'

export function mapUndefinedPropsToDeleteField<T>(model: T): object {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(filter(isNil), mapObjIndexed(always(FieldValue.delete())))(model)
}
