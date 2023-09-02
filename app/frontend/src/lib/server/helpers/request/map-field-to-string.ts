import { Field } from '@echo/firestore'
import { is, join } from 'ramda'

export function mapFieldToString(field: Field) {
  if (is(Array, field)) {
    return join('.', field)
  }
  return field
}
