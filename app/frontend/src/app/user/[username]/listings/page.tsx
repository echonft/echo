import { mapListingFiltersToQueryParams } from '@echo/api/helpers/request/map-listing-filters-to-query-params'
import { mapQueryConstraintsToQueryParams } from '@echo/api/helpers/request/map-query-constraints-to-query-params'
import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import { linkProvider } from '@echo/api/services/routing/link-provider'
import { type ListingsResponse } from '@echo/api/types/responses/listings-response'
import { LISTING_FILTER_AS_ITEM } from '@echo/firestore/constants/listing/listing-filter-as'
import { getAuthUser } from '@echo/frontend/lib/helpers/auth/get-auth-user'
import { getCookieHeader } from '@echo/frontend/lib/helpers/auth/get-cookie-header'
import { assertNextFetchResponse } from '@echo/frontend/lib/services/fetch/assert-next-fetch-response'
import { nextFetch } from '@echo/frontend/lib/services/fetch/next-fetch'
import { UserListingsApiProvided } from '@echo/ui/components/user/api-provided/user-listings-api-provided'
import { redirect } from 'next/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'
import { mergeLeft } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  params: {
    username: string
  }
}

const UserListingsPage: FunctionComponent<Props> = async ({ params: { username } }) => {
  unstable_setRequestLocale('en')
  const user = await getAuthUser()
  if (user?.username === username) {
    redirect(linkProvider.profile.listingsCreated.get())
  }
  const constraintsQueryParams = mapQueryConstraintsToQueryParams({
    orderBy: [{ field: 'expiresAt', direction: 'desc' }]
  })
  const filtersQueryParam = mapListingFiltersToQueryParams({ as: LISTING_FILTER_AS_ITEM, includeExpired: true })
  const response = await nextFetch.get<ListingsResponse>(apiUrlProvider.user.listings.getUrl({ username }), {
    cookie: getCookieHeader(),
    params: mergeLeft(constraintsQueryParams, filtersQueryParam)
  })
  assertNextFetchResponse(response)
  return <UserListingsApiProvided username={username} listings={response.data.listings} user={user} />
}

export default UserListingsPage
