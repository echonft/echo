import { OrderByParameters } from '@echo/firestore-types'

export function mapOrderByParametersToTuple(params: OrderByParameters) {
  return [params.field, params.direction ?? 'asc']
}
