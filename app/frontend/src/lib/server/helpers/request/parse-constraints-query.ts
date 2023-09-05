import { BadRequestError } from '../error/bad-request-error'
import { ApiRequest } from '@echo/api'
import { OrderByParameters, QueryConstraints } from '@echo/firestore-types'
import { applySpec, assoc, head, isEmpty, last, splitEvery } from 'ramda'
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
  try {
    let constraints = {} as QueryConstraints
    const { searchParams } = new URL(req.url)
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
      const limit = queryContraintLimitSchema.parse(searchParams.get('limit'))
      constraints = assoc('limit', limit, constraints)
    }
    if (searchParams.has('limitToLast')) {
      const limitToLast = queryContraintLimitToLastSchema.parse(searchParams.get('limitToLast'))
      constraints = assoc('limitToLast', limitToLast, constraints)
    }
    if (searchParams.has('offset')) {
      const offset = queryContraintOffsetSchema.parse(searchParams.get('offset'))
      constraints = assoc('offset', offset, constraints)
    }
    if (isEmpty(constraints)) {
      return undefined
    }
    return constraints
  } catch (e) {
    throw new BadRequestError()
  }
}
