import { intStringSchema } from '@echo/model/validators/int-string-schema'
import { object } from 'zod'

export const ipfsGatewaySearchParamsSchema = object({
  width: intStringSchema
}).transform(({ width }) => {
  return { 'img-width': width }
})
