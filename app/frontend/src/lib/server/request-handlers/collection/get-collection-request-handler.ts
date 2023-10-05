import type { ApiRequest } from '@echo/api/types/base/api-request'
import type { GetCollectionResponse } from '@echo/api/types/responses/get-collection-response'
import { assertCollectionExists } from '@server/helpers/collection/assert-collection-exists'
import { getCollectionBySlug } from '@server/helpers/collection/get-collection-by-slug'
import { NextResponse } from 'next/server'

export async function getCollectionRequestHandler(_req: ApiRequest<never>, slug: string) {
  const collection = await getCollectionBySlug(slug)
  assertCollectionExists(slug, collection)
  return NextResponse.json<GetCollectionResponse>({ collection })
}
