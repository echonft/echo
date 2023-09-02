import { queryContraintLimitSchema } from '../../validators/query-contraint-limit-schema'
import { queryContraintLimitToLastSchema } from '../../validators/query-contraint-limit-to-last-schema'
import { queryContraintOffsetSchema } from '../../validators/query-contraint-offset-schema'
import { queryContraintOrderBySchema } from '../../validators/query-contraint-order-by-schema'
import { queryContraintSelectSchema } from '../../validators/query-contraint-select-schema'
import { BadRequestError } from '../error/bad-request-error'
import { ApiRequest } from '@echo/api'
import { QueryConstraints } from '@echo/firestore'
import { assoc, isEmpty } from 'ramda'

export function parseContraintsQuery<T>(req: ApiRequest<T>) {
  try {
    let constraints = {}
    const { searchParams } = new URL(req.url)
    if (searchParams.has('select')) {
      const select = queryContraintSelectSchema.parse(searchParams.getAll('select'))
      constraints = assoc('select', select, constraints)
    }
    if (searchParams.has('orderBy')) {
      const orderBy = queryContraintOrderBySchema.parse(searchParams.getAll('orderBy'))
      constraints = assoc('orderBy', orderBy, constraints)
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
