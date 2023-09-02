import { OrderByParameters } from '@echo/firestore'

export function mapOrderByParametersToTuple(params: OrderByParameters) {
  return [params.field, params.direction ?? 'asc']
}
