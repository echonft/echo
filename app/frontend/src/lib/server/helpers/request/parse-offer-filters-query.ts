import { booleanQueryParamSchema } from '../../validators/boolean-query-param-schema'
import { BadRequestError } from '../error/bad-request-error'
import { ApiRequest } from '@echo/api'
import { OFFER_FILTER_AS, OFFER_STATES, OfferQueryFilters } from '@echo/firestore-types'
import { assoc, isEmpty } from 'ramda'
import { z } from 'zod'

const stateQueryParamSchema = z.enum(OFFER_STATES).array().nonempty()

const asQueryParamSchema = z.enum(OFFER_FILTER_AS)

export function parseOfferFiltersQuery<T>(req: ApiRequest<T>) {
  try {
    let filters = {} as OfferQueryFilters
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
    return filters
  } catch (e) {
    throw new BadRequestError()
  }
}
