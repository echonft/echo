import { Field } from '../../types/abstract/field'
import { FieldPath } from 'firebase-admin/firestore'
import { is } from 'ramda'

export function mapFieldToFieldPath(field: Field): string | FieldPath {
  if (is(Array, field)) {
    return new FieldPath(...field)
  }
  return field
}
