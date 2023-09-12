import type { ListingQueryFilters } from '@echo/firestore-types'
import modifyBooleanPropToString from '@echo/utils/modify-boolean-prop-to-string'
import modifyPropName from '@echo/utils/modify-prop-name'
import type { ListingFiltersQueryParams } from '@type/request/listing-filters-query-params'
import { pipe } from 'ramda'

export function mapListingFiltersToQueryParams(filters: ListingQueryFilters): ListingFiltersQueryParams {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(
    modifyPropName<'states', ListingQueryFilters>('states', 'state'),
    modifyPropName<'notStates', ListingQueryFilters>('notStates', 'notState'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modifyBooleanPropToString('includeExpired')
  )(filters)
}
