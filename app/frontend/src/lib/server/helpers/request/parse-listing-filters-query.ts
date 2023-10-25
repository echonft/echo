import { type ApiRequest } from '@echo/api/types/api-request'
import { LISTING_FILTER_AS } from '@echo/firestore/constants/listing-filter-as'
import { type ListingQueryFilters } from '@echo/firestore/types/query/listing-query-filters'
import { BadRequestError } from '@echo/frontend/lib/server/helpers/error/bad-request-error'
import { booleanQueryParamSchema } from '@echo/frontend/lib/server/validators/boolean-query-param-schema'
import { LISTING_STATES } from '@echo/model/constants/listing-states'
import { assoc, both, has, isEmpty } from 'ramda'
import { z } from 'zod'

const asQueryParamSchema = z.enum(LISTING_FILTER_AS)
const stateQueryParamSchema = z.enum(LISTING_STATES).array().nonempty()

export function parseListingFiltersQuery<T>(req: ApiRequest<T>) {
  let filters = {} as ListingQueryFilters
  const { searchParams } = new URL(req.url)
  try {
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
    throw new BadRequestError(
      `error parsing listing filters query parameters: ${JSON.stringify(searchParams.toString())}`,
      e
    )
  }
}
