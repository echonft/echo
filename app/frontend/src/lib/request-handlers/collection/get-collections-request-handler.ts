import { type ApiRequest } from '@echo/api/types/api-request'
import type { CollectionProviderResult } from '@echo/api/types/providers/collection-provider-result'
import { type CollectionsResponse } from '@echo/api/types/responses/collections-response'
import { getAllCollections } from '@echo/firestore/crud/collection/get-all-collections'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/helpers/error/guard'
import type { Collection } from '@echo/model/types/collection'
import { NextResponse } from 'next/server'
import { andThen, map, pick, pipe } from 'ramda'

export async function getCollectionsRequestHandler(_req: ApiRequest<never>) {
  const collections = await guardAsyncFn(
    pipe<[], Promise<Collection[]>, Promise<CollectionProviderResult[]>>(
      getAllCollections,
      andThen(
        map<Collection, CollectionProviderResult>(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          pick(['bannerUrl', 'name', 'profilePictureUrl', 'totalSupply', 'slug'])
        )
      )
    ),
    ErrorStatus.SERVER_ERROR
  )()
  return NextResponse.json<CollectionsResponse>({
    collections
  })
}
