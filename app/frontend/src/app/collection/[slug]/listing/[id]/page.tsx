import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import { type CollectionResponse } from '@echo/api/types/responses/collection-response'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import { getAuthUser } from '@echo/frontend/lib/helpers/auth/get-auth-user'
import { assertNextFetchResponse } from '@echo/frontend/lib/services/fetch/assert-next-fetch-response'
import { nextFetch } from '@echo/frontend/lib/services/fetch/next-fetch'
import type { ListingTarget } from '@echo/model/types/listing-target'
import { ListingDetailsApiProvided } from '@echo/ui/components/listing/api-provided/listing-details-api-provided'
import { isIn } from '@echo/utils/fp/is-in'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { notFound } from 'next/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'
import { map, path, pipe } from 'ramda'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  params: {
    slug: string
    id: string
  }
}

const ListingDetailsPage: FunctionComponent<PropsWithChildren<Props>> = async ({ params: { slug, id } }) => {
  unstable_setRequestLocale('en')
  const user = await getAuthUser()
  const collectionResponse = await nextFetch.get<CollectionResponse>(apiUrlProvider.collection.get.getUrl({ slug }))
  const listingResponse = await nextFetch.get<ListingResponse>(apiUrlProvider.listing.get.getUrl({ listingId: id }))
  assertNextFetchResponse(collectionResponse)
  assertNextFetchResponse(listingResponse)
  const listingSlugs = pipe<[ListingResponse], ListingTarget[], string[]>(
    nonNullableReturn(path(['listing', 'targets'])),
    map(nonNullableReturn(path(['collection', 'slug'])))
  )(listingResponse.data)
  if (!isIn(listingSlugs, slug)) {
    notFound()
  }
  return <ListingDetailsApiProvided listing={listingResponse.data.listing} user={user} />
}

export default ListingDetailsPage
