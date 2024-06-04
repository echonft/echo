import { propIsNilOrEmpty } from '@echo/utils/fp/prop-is-nil-or-empty'
import { always, identity, ifElse } from 'ramda'
import { number, object, string } from 'zod'

export const collectionAttributeResponseSchema = object({
  attribute_value: string(),
  total: number()
}).transform(ifElse(propIsNilOrEmpty('attribute_value'), always(null), identity))
