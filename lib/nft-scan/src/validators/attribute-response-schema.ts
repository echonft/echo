import { propIsNilOrEmpty } from '@echo/utils/fp/prop-is-nil-or-empty'
import { always, either, identity, ifElse } from 'ramda'
import { z } from 'zod'

export const attributeResponseSchema = z
  .object({
    attribute_name: z.string(),
    attribute_value: z.string(),
    percentage: z.string().nullable()
  })
  .transform(
    ifElse(either(propIsNilOrEmpty('attribute_name'), propIsNilOrEmpty('attribute_value')), always(null), identity)
  )
