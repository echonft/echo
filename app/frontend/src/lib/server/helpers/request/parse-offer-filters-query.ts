import type { ApiRequest } from '@echo/api/types/api-request'
import { OFFER_FILTER_AS } from '@echo/firestore/constants/offer-filter-as'
import { OFFER_STATES } from '@echo/firestore/types/model/offer/firestore-offer-state'
import type { OfferQueryFilters } from '@echo/firestore/types/query/offer-query-filters'
import { BadRequestError } from '@server/helpers/error/bad-request-error'
import { booleanQueryParamSchema } from '@server/validators/boolean-query-param-schema'
import { assoc, both, has, isEmpty } from 'ramda'
import { z } from 'zod'

const stateQueryParamSchema = z.enum(OFFER_STATES).array().nonempty()

const asQueryParamSchema = z.enum(OFFER_FILTER_AS)

export function parseOfferFiltersQuery<T>(req: ApiRequest<T>) {
  let filters = {} as OfferQueryFilters
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
      `error parsing offer filters query parameters: ${JSON.stringify(searchParams.toString())}`,
      e
    )
  }
}
