import { ResponseError } from '@echo/utils/constants/errors/response-error'
import { andThen, isNil, pipe } from 'ramda'
import { Schema, type ZodTypeDef } from 'zod'

export function innerParseResponse<Output = unknown, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(
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

export function parseResponse<Output = unknown, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(
  schema: Schema<Output, Def, Input>
): (response: Response) => Promise<Output>
export function parseResponse<Output = unknown, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(
  schema: Schema<Output, Def, Input>,
  response: Response
): Promise<Output>
export function parseResponse<Output = unknown, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(
  schema: Schema<Output, Def, Input>,
  response?: Response
): Promise<Output> | ((response: Response) => Promise<Output>) {
  if (isNil(response)) {
    return innerParseResponse<Output, Def, Input>(schema)
  }
  return innerParseResponse<Output, Def, Input>(schema)(response)
}
