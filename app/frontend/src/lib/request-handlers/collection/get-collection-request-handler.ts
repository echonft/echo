import type { ApiRequest } from '@echo/api/types/api-request'
import { type CollectionResponse } from '@echo/api/types/responses/collection-response'
import { findCollectionBySlug } from '@echo/firestore/crud/collection/find-collection-by-slug'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guarded_assertCollectionExists } from '@echo/frontend/lib/helpers/collection/assert/guarded_assert-collection-exists'
import { guardAsyncFn } from '@echo/frontend/lib/helpers/error/guard'
import { NextResponse } from 'next/server'

export async function getCollectionRequestHandler(_request: ApiRequest<never>, params: { slug: string }) {
  const { slug } = params
  const collection = await guardAsyncFn(findCollectionBySlug, ErrorStatus.SERVER_ERROR)(slug)
  guarded_assertCollectionExists(collection, slug)
  return NextResponse.json<CollectionResponse>({ collection })
}
