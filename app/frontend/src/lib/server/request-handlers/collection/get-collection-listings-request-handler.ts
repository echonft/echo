import { type ApiRequest } from '@echo/api/types/api-request'
import { type ListingsResponse } from '@echo/api/types/responses/listings-response'
import { findCollectionBySlug } from '@echo/firestore/crud/collection/find-collection-by-slug'
import { getListingsForCollection } from '@echo/firestore/crud/listing/get-listings-for-collection'
import { ErrorStatus } from '@echo/frontend/lib/server/constants/error-status'
import { guarded_assertCollectionExists } from '@echo/frontend/lib/server/helpers/collection/assert/guarded_assert-collection-exists'
import { guardAsyncFn, guardFn } from '@echo/frontend/lib/server/helpers/error/guard'
import { parseConstraintsQuery } from '@echo/frontend/lib/server/helpers/request/parse-constraints-query'
import { parseListingFiltersQuery } from '@echo/frontend/lib/server/helpers/request/parse-listing-filters-query'
import { NextResponse } from 'next/server'

export async function getCollectionListingsRequestHandler(req: ApiRequest<never>, slug: string) {
  const constraints = guardFn(parseConstraintsQuery, ErrorStatus.BAD_REQUEST)(req)
  const filters = guardFn(parseListingFiltersQuery, ErrorStatus.BAD_REQUEST)(req)
  const collection = await guardAsyncFn(findCollectionBySlug, ErrorStatus.SERVER_ERROR)(slug)
  guarded_assertCollectionExists(collection, slug)
  const listings = await guardAsyncFn(getListingsForCollection, ErrorStatus.SERVER_ERROR)(
    collection.id,
    filters,
    constraints
  )
  return NextResponse.json<ListingsResponse>({ listings })
}
