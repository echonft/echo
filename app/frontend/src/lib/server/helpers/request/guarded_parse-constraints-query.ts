import { type ApiRequest } from '@echo/api/types/api-request'
import { type OrderByParameters } from '@echo/firestore/types/query/order-by-parameters'
import { type QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { guarded_addParamFromRequest } from '@echo/frontend/lib/server/helpers/request/guarded_add-param-from-request'
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
export function guarded_parseConstraintsQuery<T>(request: ApiRequest<unknown>) {
  const positiveIntegerString = z
    .string()
    .min(1)
    .transform((val, ctx) => {
      const parsed = parseInt(val, 10)
      if (isNaN(parsed)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Not a number'
        })
        return z.NEVER
      }
      if (!Number.isInteger(parsed)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Not a integer'
        })
        return z.NEVER
      }
      if (parsed <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Number is not greater than 0'
        })
        return z.NEVER
      }
      return parsed
    })
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
    guarded_addParamFromRequest('select', selectSchema, true),
    guarded_addParamFromRequest('orderBy', orderBySchema, true),
    guarded_addParamFromRequest('limit', positiveIntegerString),
    guarded_addParamFromRequest('offset', positiveIntegerString),
    when(propIsEmpty('params'), modify('params', always(undefined))),
    prop('params')
  )({
    request,
    params: {} as QueryConstraints<T>
  })
}
