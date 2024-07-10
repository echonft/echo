import type { ApiRequest } from '@echo/api/types/api-request'
import { BadRequestError } from '@echo/frontend/lib/helpers/error/bad-request-error'
import { andThen, assoc, invoker, otherwise, pipe } from 'ramda'
import { Schema } from 'zod'
import type { ZodTypeDef } from 'zod/lib/types'

export function parseRequest<Request, Output = unknown, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(
  schema: Schema<Output, Def, Input>
) {
  return function (request: ApiRequest<Request>) {
    return pipe(
      invoker(0, 'json'),
      otherwise((err) => Promise.reject(new BadRequestError({ err, message: 'could not get request JSON body' }))),
      andThen(async (body) => {
        try {
          return await schema.parseAsync(body)
        } catch (err) {
          return Promise.reject(new BadRequestError({ err: assoc('request_body', body, err) }))
        }
      })
    )(request)
  }
}
