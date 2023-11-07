import { type CollectionResponse } from '@echo/api/types/responses/collection-response'
import { findCollectionBySlug } from '@echo/firestore/crud/collection/find-collection-by-slug'
import { ErrorStatus } from '@echo/frontend/lib/server/constants/error-status'
import { guarded_assertCollectionExists } from '@echo/frontend/lib/server/helpers/collection/assert/guarded_assert-collection-exists'
import { guardAsyncFn } from '@echo/frontend/lib/server/helpers/error/guard'
import { NextResponse } from 'next/server'

export async function getCollectionRequestHandler(slug: string) {
  const collection = await guardAsyncFn(findCollectionBySlug, ErrorStatus.SERVER_ERROR)(slug)
  guarded_assertCollectionExists(collection, slug)
  return NextResponse.json<CollectionResponse>({ collection })
}
