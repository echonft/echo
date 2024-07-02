import type { ApiRequest } from '@echo/api/types/api-request'
import { andThen, invoker, otherwise, pipe } from 'ramda'
import { Schema } from 'zod'
import type { ZodTypeDef } from 'zod/lib/types'

export function parseRequest<Request, Output = unknown, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(
  schema: Schema<Output, Def, Input>
) {
  return function (request: ApiRequest<Request>) {
    return pipe(
      invoker(0, 'json'),
      otherwise(() => Promise.reject(Error('could not get request JSON body'))),
      andThen((body) => schema.parse(body))
    )(request)
  }
}
