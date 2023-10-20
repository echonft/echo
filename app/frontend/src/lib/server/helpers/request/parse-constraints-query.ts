import { type ApiRequest } from '@echo/api/types/api-request'
import { type OrderByParameters } from '@echo/firestore/types/query/order-by-parameters'
import { type QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { BadRequestError } from '@server/helpers/error/bad-request-error'
import { applySpec, assoc, has, head, isEmpty, last, splitEvery } from 'ramda'
import { z } from 'zod'

const queryContraintLimitSchema = z.number().gt(0)
const queryContraintLimitToLastSchema = z.number().gt(0)
const queryContraintOffsetSchema = z.number().gt(0)
const queryContraintOrderByDirectionSchema = z.enum(['desc', 'asc']).optional()
const queryContraintOrderBySchema = z.tuple([z.string().nonempty(), queryContraintOrderByDirectionSchema]).transform(
  applySpec<OrderByParameters>({
    field: head,
    direction: last
  })
)
const queryContraintSelectSchema = z.string().nonempty().array().nonempty()

export function parseConstraintsQuery<T>(req: ApiRequest<T>) {
  let constraints = {} as QueryConstraints
  const { searchParams } = new URL(req.url)
  try {
    if (searchParams.has('select')) {
      const select = queryContraintSelectSchema.parse(searchParams.getAll('select'))
      constraints = assoc('select', select, constraints)
    }
    if (searchParams.has('orderBy')) {
      const tuples = splitEvery(2, searchParams.getAll('orderBy'))
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/unbound-method
      const orderByParameters = tuples.map(queryContraintOrderBySchema.parse)
      constraints = assoc('orderBy', orderByParameters, constraints)
    }
    if (searchParams.has('limit')) {
      const limit = queryContraintLimitSchema.parse(parseInt(searchParams.get('limit')!))
      constraints = assoc('limit', limit, constraints)
    }
    if (searchParams.has('limitToLast')) {
      const limitToLast = queryContraintLimitToLastSchema.parse(parseInt(searchParams.get('limitToLast')!))
      constraints = assoc('limitToLast', limitToLast, constraints)
    }
    if (searchParams.has('offset')) {
      const offset = queryContraintOffsetSchema.parse(parseInt(searchParams.get('offset')!))
      constraints = assoc('offset', offset, constraints)
    }

    if (isEmpty(constraints)) {
      return undefined
    }

    if (has('limitToLast', constraints)) {
      if (has('limit', constraints)) {
        throw Error('limit and limitToLast query constraints are mutually exclusive')
      }
      if (!has('orderBy', constraints)) {
        throw Error('You must specify at least one orderBy clause for limitToLast queries')
      }
    }

    return constraints
  } catch (e) {
    throw new BadRequestError(
      `error parsing constraints query parameters: ${JSON.stringify(searchParams.toString())}`,
      e
    )
  }
}
