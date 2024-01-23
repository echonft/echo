import { type ApiRequest } from '@echo/api/types/api-request'
import { type OrderByParameters } from '@echo/firestore/types/query/order-by-parameters'
import { type QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { addParamFromRequest } from '@echo/frontend/lib/helpers/request/add-param-from-request'
import { positiveIntegerStringSchema } from '@echo/frontend/lib/validators/positive-integer-string-schema'
import { hasDuplicates } from '@echo/utils/fp/has-duplicates'
import { propIsEmpty } from '@echo/utils/fp/prop-is-empty'
import { throwError } from '@echo/utils/fp/throw-error'
import { errorMessage } from '@echo/utils/helpers/error-message'
import {
  always,
  applySpec,
  either,
  equals,
  head,
  ifElse,
  last,
  length,
  map,
  modify,
  pipe,
  prop,
  splitEvery,
  toLower,
  unless,
  when
} from 'ramda'
import { z } from 'zod'

function mapTupleToOrderByParameters(tuples: unknown[][]): OrderByParameters[] {
  return map(
    ifElse<[unknown[]], OrderByParameters, OrderByParameters>(
      pipe<[unknown[]], number, boolean>(length, equals(2)),
      applySpec<OrderByParameters>({
        field: head,
        direction: pipe(
          last,
          toLower,
          unless(either(equals('desc'), equals('asc')), throwError(new Error('bad orderBy direction')))
        )
      }),
      throwError<OrderByParameters>(new Error('orderBy direction is missing'))
    ),
    tuples
  )
}
export function parseConstraintsQuery<T>(request: ApiRequest<unknown>) {
  const orderBySchema = z
    .string()
    .min(1)
    .array()
    .min(1)
    .transform((val, ctx) => {
      try {
        const parameters = pipe(splitEvery(2), mapTupleToOrderByParameters)(val)
        if (pipe<[OrderByParameters[]], string[], boolean>(map(prop('field')), hasDuplicates)(parameters)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'orderBy parameters contain duplicates'
          })
          return z.NEVER
        }
        return parameters
      } catch (error) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: errorMessage(error)
        })
        return z.NEVER
      }
    })
  const selectSchema = z.string().min(1).array().min(1)
  return pipe(
    addParamFromRequest('select', selectSchema, true),
    addParamFromRequest('orderBy', orderBySchema, true),
    addParamFromRequest('limit', positiveIntegerStringSchema),
    addParamFromRequest('offset', positiveIntegerStringSchema),
    when(propIsEmpty('params'), modify('params', always(undefined))),
    prop('params')
  )({
    request,
    params: {} as QueryConstraints<T>
  })
}
