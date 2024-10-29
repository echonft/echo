import { prop } from 'ramda'
import { object, string } from 'zod'

export const updateUserRequestSchema = object({
  access_token: string().min(1)
})

export const updateUserRequestSchemaTransform = updateUserRequestSchema.transform(prop('access_token'))
