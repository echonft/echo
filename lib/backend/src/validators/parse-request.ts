import { RequestError } from '@echo/backend/constants/errors/request-error'
import type { NextRequest } from '@echo/backend/types/next-request'
import { andThen, invoker, otherwise, pipe } from 'ramda'
import { Schema, type ZodTypeDef } from 'zod'

export function parseRequest<Request, Output = unknown, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(
  schema: Schema<Output, Def, Input>
) {
  return function (request: NextRequest<Request>) {
    return pipe(
      invoker(0, 'json'),
      otherwise<Output>((_err) => Promise.reject(Error(RequestError.Invalid))),
      andThen((body) => {
        return schema.parseAsync(body)
      })
    )(request)
  }
}
