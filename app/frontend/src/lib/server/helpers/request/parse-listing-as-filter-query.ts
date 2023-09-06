import { BadRequestError } from '../error/bad-request-error'
import { ApiRequest } from '@echo/api'
import { LISTING_FILTER_AS, ListingAsQueryFilter } from '@echo/firestore-types'
import { z } from 'zod'

const asQueryParamSchema = z.enum(LISTING_FILTER_AS)

export function parseListingAsFilterQuery<T>(req: ApiRequest<T>) {
  try {
    const { searchParams } = new URL(req.url)
    if (searchParams.has('as')) {
      const asFilter = asQueryParamSchema.parse(searchParams.get('as'))
      return { as: asFilter } as ListingAsQueryFilter
    }
    return undefined
  } catch (e) {
    throw new BadRequestError()
  }
}
