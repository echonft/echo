import type { ApiRequest } from '@echo/api/types/api-request'
import { ZodEffects, ZodObject, type ZodRawShape } from 'zod'

export function parseRequest<TRequest, TRawShape extends ZodRawShape>(
  schema: ZodObject<TRawShape> | ZodEffects<ZodObject<TRawShape>>
) {
  return async function (request: ApiRequest<TRequest>) {
    const data = await request.json()
    return schema.parse(data)
  }
}
