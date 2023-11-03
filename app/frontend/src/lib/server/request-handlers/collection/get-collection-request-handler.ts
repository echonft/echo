import { type ApiRequest } from '@echo/api/types/api-request'
import { type CollectionResponse } from '@echo/api/types/responses/collection-response'
import { assertCollectionExists } from '@echo/frontend/lib/server/helpers/collection/assert-collection-exists'
import { guarded_findCollectionBySlug } from '@echo/frontend/lib/server/helpers/collection/guarded_find-collection-by-slug'
import { NextResponse } from 'next/server'

export async function getCollectionRequestHandler(_req: ApiRequest<never>, slug: string) {
  const collection = await guarded_findCollectionBySlug(slug)
  assertCollectionExists(collection, slug)
  return NextResponse.json<CollectionResponse>({ collection })
}
