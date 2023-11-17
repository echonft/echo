import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import { type CollectionResponse } from '@echo/api/types/responses/collection-response'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import { authOptions } from '@echo/frontend/lib/constants/auth-options'
import { assertNextFetchResponse } from '@echo/frontend/lib/services/fetch/assert-next-fetch-response'
import { nextFetch } from '@echo/frontend/lib/services/fetch/next-fetch'
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
  const collectionResponse = await nextFetch.get<CollectionResponse>(apiUrlProvider.collection.get.get({ slug }))
  const listingResponse = await nextFetch.get<ListingResponse>(apiUrlProvider.listing.get.get({ listingId: id }))
  assertNextFetchResponse(collectionResponse)
  assertNextFetchResponse(listingResponse)
  const listingSlugs = pipe<[ListingResponse], ListingTarget[], string[]>(
    nonNullableReturn(path(['listing', 'targets'])),
    map(nonNullableReturn(path(['collection', 'slug'])))
  )(listingResponse.data)
  if (!isIn(listingSlugs, slug)) {
    notFound()
  }
  return <ListingDetailsApiProvided listing={listingResponse.data.listing} user={session?.user} />
}

export default ListingDetailsPage
