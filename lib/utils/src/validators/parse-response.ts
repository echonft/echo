import { Schema } from 'zod'
import type { ZodTypeDef } from 'zod/lib/types'

export function parseResponse<Output = unknown, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(
  schema: Schema<Output, Def, Input>
) {
  return async function (response: Response) {
    const data = (await response.json()) as unknown
    return schema.parse(data)
  }
}
