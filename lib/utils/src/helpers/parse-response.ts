import { ResponseError } from '@echo/utils/constants/errors/response-error'
import { andThen, pipe } from 'ramda'
import { Schema, type ZodTypeDef } from 'zod'

export function parseResponse<Output = unknown, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(
  schema: Schema<Output, Def, Input>
) {
  return function (response: Response) {
    return pipe(
      (res: Response) => {
        if (response.ok) {
          return res.json()
        }
        return Promise.reject(Error(ResponseError.Failed))
      },
      andThen((body) => schema.parse(body))
    )(response)
  }
}
