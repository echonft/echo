import { BadRequestError } from '../../server/helpers/error/bad-request-error'
import { queryContraintLimitSchema } from '../../server/validators/query-contraint-limit-schema'
import { queryContraintLimitToLastSchema } from '../../server/validators/query-contraint-limit-to-last-schema'
import { queryContraintOffsetSchema } from '../../server/validators/query-contraint-offset-schema'
import { queryContraintOrderBySchema } from '../../server/validators/query-contraint-order-by-schema'
import { queryContraintSelectSchema } from '../../server/validators/query-contraint-select-schema'
import { ApiRequest } from '@echo/api'
import { QueryConstraints } from '@echo/firestore-types'
import { assoc, isEmpty, splitEvery } from 'ramda'

export function parseContraintsQuery<T>(req: ApiRequest<T>) {
  try {
    let constraints = {}
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
    return constraints as QueryConstraints
  } catch (e) {
    throw new BadRequestError()
  }
}
