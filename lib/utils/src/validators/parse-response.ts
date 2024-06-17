import { ZodEffects, ZodObject, type ZodRawShape } from 'zod'

export function parseResponse<T extends ZodRawShape>(schema: ZodObject<T> | ZodEffects<ZodObject<T>>) {
  return async function (response: Response) {
    const data = (await response.json()) as T
    return schema.parse(data)
  }
}
