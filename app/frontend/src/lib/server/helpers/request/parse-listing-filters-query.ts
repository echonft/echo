import { booleanQueryParamSchema } from '../../validators/boolean-query-param-schema'
import { BadRequestError } from '../error/bad-request-error'
import { ApiRequest } from '@echo/api'
import { LISTING_FILTER_AS, LISTING_STATES, ListingQueryFilters } from '@echo/firestore-types'
import { assoc, both, has, isEmpty } from 'ramda'
import { z } from 'zod'

const asQueryParamSchema = z.enum(LISTING_FILTER_AS)
const stateQueryParamSchema = z
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  .enum(LISTING_STATES as readonly string[])
  .array()
  .nonempty()

export function parseListingFiltersQuery<T>(req: ApiRequest<T>) {
  try {
    let filters = {} as ListingQueryFilters
    const { searchParams } = new URL(req.url)
    if (searchParams.has('as')) {
      const asFilter = asQueryParamSchema.parse(searchParams.get('as'))
      filters = assoc('as', asFilter, filters)
    }
    if (searchParams.has('state')) {
      const states = stateQueryParamSchema.parse(searchParams.getAll('state'))
      filters = assoc('states', states, filters)
    }
    if (searchParams.has('notState')) {
      const notStates = stateQueryParamSchema.parse(searchParams.getAll('notState'))
      filters = assoc('notStates', notStates, filters)
    }
    if (searchParams.has('includeExpired')) {
      const includeExpired = booleanQueryParamSchema.parse(searchParams.get('includeExpired'))
      filters = assoc('includeExpired', includeExpired, filters)
    }

    if (isEmpty(filters)) {
      return undefined
    }

    if (both(has('states'), has('notStates'))(filters)) {
      throw Error('states and notStates filters are mutually exclusive')
    }

    return filters
  } catch (e) {
    throw new BadRequestError()
  }
}
