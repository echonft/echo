import { Response } from 'next/dist/compiled/@edge-runtime/primitives'
import { andThen, pipe } from 'ramda'
import { Schema } from 'zod'
import type { ZodTypeDef } from 'zod/lib/types'

export function parseResponse<Output = unknown, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(
  schema: Schema<Output, Def, Input>
) {
  return function (response: Response) {
    return pipe(
      (res: Response) => res.json(),
      andThen((body) => schema.parse(body))
    )(response)
  }
}
