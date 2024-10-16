import { BadRequestError } from '@echo/backend/errors/bad-request-error'
import type { NextRequest } from '@echo/backend/types/next-request'
import { andThen, assoc, invoker, otherwise, pipe } from 'ramda'
import { Schema, type ZodTypeDef } from 'zod'

export function parseRequest<Request, Output = unknown, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(
  schema: Schema<Output, Def, Input>
) {
  return function (request: NextRequest<Request>) {
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
