import { type ListingQueryFilters } from '@echo/firestore/types/query/listing-query-filters'
import { type ListingFiltersQueryParams } from '@echo/frontend/lib/types/request/listing-filters-query-params'
import { modifyBooleanPropToString } from '@echo/utils/fp/modify-boolean-prop-to-string'
import { modifyPropName } from '@echo/utils/fp/modify-prop-name'
import { pipe } from 'ramda'

export function mapListingFiltersToQueryParams(filters: ListingQueryFilters): ListingFiltersQueryParams {
  return pipe(
    modifyPropName<'states', ListingQueryFilters, 'state'>('states', 'state'),
    modifyPropName<'notStates', ListingQueryFilters, 'notState'>('notStates', 'notState'),
    modifyBooleanPropToString('includeExpired')
  )(filters)
}
