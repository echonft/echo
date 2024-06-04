import { propIsNilOrEmpty } from '@echo/utils/fp/prop-is-nil-or-empty'
import { always, either, identity, ifElse } from 'ramda'
import { object, string } from 'zod'

export const nftAttributeResponseSchema = object({
  attribute_name: string(),
  attribute_value: string(),
  percentage: string().nullable()
}).transform(
  ifElse(either(propIsNilOrEmpty('attribute_name'), propIsNilOrEmpty('attribute_value')), always(null), identity)
)
