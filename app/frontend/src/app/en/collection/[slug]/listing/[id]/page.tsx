import { collectionApiUrl } from '@echo/api/routing/collection-api-url'
import { listingApiUrl } from '@echo/api/routing/listing-api-url'
import { type CollectionResponse } from '@echo/api/types/responses/collection-response'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import { authOptions } from '@echo/frontend/lib/constants/auth-options'
import { assertFetchResult } from '@echo/frontend/lib/services/fetcher/assert-fetch-result'
import { fetcher } from '@echo/frontend/lib/services/fetcher/fetcher'
import type { ListingTarget } from '@echo/model/types/listing-target'
import { ListingDetailsApiProvided } from '@echo/ui/components/listing/api-provided/listing-details-api-provided'
import { isIn } from '@echo/utils/fp/is-in'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { map, path, pipe } from 'ramda'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  params: {
    slug: string
    id: string
  }
}

const ListingDetailsPage: FunctionComponent<PropsWithChildren<Props>> = async ({ params: { slug, id } }) => {
  const session = await getServerSession(authOptions)
  const collectionResult = await fetcher(collectionApiUrl(slug)).fetch<CollectionResponse>()
  const listingResult = await fetcher(listingApiUrl(id)).fetch<ListingResponse>()
  assertFetchResult(collectionResult)
  assertFetchResult(listingResult)
  const listingSlugs = pipe<[ListingResponse], ListingTarget[], string[]>(
    nonNullableReturn(path(['listing', 'targets'])),
    map(nonNullableReturn(path(['collection', 'slug'])))
  )(listingResult.data)
  if (!isIn(listingSlugs, slug)) {
    notFound()
  }
  return <ListingDetailsApiProvided listing={listingResult.data.listing} user={session?.user} />
}

export default ListingDetailsPage
