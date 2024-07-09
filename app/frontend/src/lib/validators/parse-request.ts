import type { ApiRequest } from '@echo/api/types/api-request'
import { BadRequestError } from '@echo/frontend/lib/helpers/error/bad-request-error'
import { andThen, invoker, otherwise, pipe } from 'ramda'
import { Schema } from 'zod'
import type { ZodTypeDef } from 'zod/lib/types'

export function parseRequest<Request, Output = unknown, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(
  schema: Schema<Output, Def, Input>
) {
  return function (request: ApiRequest<Request>) {
    return pipe(
      invoker(0, 'json'),
      otherwise(() => {
        throw new BadRequestError({ message: 'could not get request JSON body' })
      }),
      andThen(
        pipe(
          (body) => schema.parseAsync(body),
          otherwise(() => {
            throw new BadRequestError()
          })
        )
      )
    )(request)
  }
}
