import { Field } from '../../types/abstract/field'
import { mapFieldToFieldPath } from './map-field-to-field-path'
import { isIn } from '@echo/utils'
import { CollectionReference, Query } from 'firebase-admin/firestore'
import { filter, is, isEmpty, map } from 'ramda'

export function addSelectConstraint<T>(
  query: CollectionReference<T> | Query<T>,
  selectFields: Field | Field[],
  availableFields: Field[]
) {
  const validFields = is(Array, selectFields)
    ? filter(isIn(availableFields), selectFields)
    : filter(isIn(availableFields), [selectFields])
  if (isEmpty(validFields)) {
    return query
  }
  const validSelectFields = map(mapFieldToFieldPath, validFields)
  return query.select(...validSelectFields) as Query<T>
}
