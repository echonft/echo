import { z, type ZodRawShape } from 'zod'

export function parseResponse<T extends ZodRawShape>(schema: z.ZodObject<T>) {
  return async function (response: Response) {
    const data = (await response.json()) as T
    return schema.parse(data)
  }
}
