import { booleanQueryParamSchema } from '../../validators/boolean-query-param-schema'
import { BadRequestError } from '../error/bad-request-error'
import { ApiRequest } from '@echo/api'
import { LISTING_STATES, ListingQueryFilters } from '@echo/firestore-types'
import { assoc, isEmpty } from 'ramda'
import { z } from 'zod'

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
    if (searchParams.has('state')) {
      const states = stateQueryParamSchema.parse(searchParams.getAll('state'))
      filters = assoc('states', states, filters)
    }
    if (searchParams.has('notState')) {
      const notStates = stateQueryParamSchema.parse(searchParams.getAll('notState'))
      filters = assoc('notStates', notStates, filters)
    }
    if (searchParams.has('includedExpired')) {
      const includedExpired = booleanQueryParamSchema.parse(searchParams.get('includedExpired'))
      filters = assoc('includedExpired', includedExpired, filters)
    }
    if (isEmpty(filters)) {
      return undefined
    }
    return filters
  } catch (e) {
    throw new BadRequestError()
  }
}
