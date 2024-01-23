import { type ApiRequest } from '@echo/api/types/api-request'
import { type CollectionsResponse } from '@echo/api/types/responses/collections-response'
import { getAllCollections } from '@echo/firestore/crud/collection/get-all-collections'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/helpers/error/guard'
import { NextResponse } from 'next/server'

export async function getCollectionsRequestHandler(_req: ApiRequest<never>) {
  const collections = await guardAsyncFn(getAllCollections, ErrorStatus.SERVER_ERROR)()
  return NextResponse.json<CollectionsResponse>({ collections })
}
