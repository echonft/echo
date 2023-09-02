import { mapFieldToString } from './map-field-to-string'
import { OrderByParameters } from '@echo/firestore'

export function mapOrderByParametersToTuple(params: OrderByParameters) {
  return [mapFieldToString(params.field), params.direction ?? 'asc']
}
