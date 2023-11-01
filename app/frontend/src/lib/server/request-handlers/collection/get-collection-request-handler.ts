import { type ApiRequest } from '@echo/api/types/api-request'
import { type CollectionResponse } from '@echo/api/types/responses/collection-response'
import { assertCollectionExists } from '@echo/frontend/lib/server/helpers/collection/assert-collection-exists'
import { getCollectionBySlug } from '@echo/frontend/lib/server/helpers/collection/get-collection-by-slug'
import { NextResponse } from 'next/server'

export async function getCollectionRequestHandler(_req: ApiRequest<never>, slug: string) {
  const collection = await getCollectionBySlug(slug)
  assertCollectionExists(collection, slug)
  return NextResponse.json<CollectionResponse>({ collection })
}
