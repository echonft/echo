import { type ApiRequest } from '@echo/api/types/api-request'
import { BadRequestError } from '@echo/frontend/lib/server/helpers/error/bad-request-error'
import { type CollectionQueryFilters } from '@echo/frontend/lib/server/types/request/collection-query-filters'
import { booleanQueryParamSchema } from '@echo/frontend/lib/server/validators/boolean-query-param-schema'
import { assoc, isEmpty } from 'ramda'

export function parseCollectionFiltersQuery<T>(req: ApiRequest<T>) {
  let filters = {} as CollectionQueryFilters
  const { searchParams } = new URL(req.url)
  try {
    if (searchParams.has('includeSwapsCount')) {
      const includeSwapsCount = booleanQueryParamSchema.parse(searchParams.get('includeSwapsCount'))
      filters = assoc('includeSwapsCount', includeSwapsCount, filters)
    }
    if (isEmpty(filters)) {
      return undefined
    }
    return filters
  } catch (e) {
    throw new BadRequestError(
      `error parsing collection filters query parameters: ${JSON.stringify(searchParams.toString())}`,
      e
    )
  }
}
