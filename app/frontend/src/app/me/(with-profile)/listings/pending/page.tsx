import { mapQueryConstraintsToQueryParams } from '@echo/api/helpers/request/map-query-constraints-to-query-params'
import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import { linkProvider } from '@echo/api/services/routing/link-provider'
import { type ListingsResponse } from '@echo/api/types/responses/listings-response'
import { LISTING_FILTER_AS_TARGET } from '@echo/firestore/constants/listing/listing-filter-as'
import { getAuthUser } from '@echo/frontend/lib/helpers/auth/get-auth-user'
import { getCookieHeader } from '@echo/frontend/lib/helpers/auth/get-cookie-header'
import { redirectIfNotLoggedIn } from '@echo/frontend/lib/helpers/auth/redirect-if-not-logged-in'
import { assertNextFetchResponse } from '@echo/frontend/lib/services/fetch/assert-next-fetch-response'
import { nextFetch } from '@echo/frontend/lib/services/fetch/next-fetch'
import {
  LISTING_STATE_CANCELLED,
  LISTING_STATE_EXPIRED,
  LISTING_STATE_FULFILLED
} from '@echo/model/constants/listing-states'
import { ProfileListingsReceivedApiProvided } from '@echo/ui/components/profile/api-provided/profile-listings-received-api-provided'
import { unstable_setRequestLocale } from 'next-intl/server'
import { mergeLeft } from 'ramda'
import { type FunctionComponent } from 'react'

const ProfileListingsReceivedPage: FunctionComponent = async () => {
  unstable_setRequestLocale('en')
  const user = await getAuthUser()
  redirectIfNotLoggedIn(user, linkProvider.profile.listingsReceived.getUrl())
  const response = await nextFetch.get<ListingsResponse>(
    apiUrlProvider.user.listings.getUrl({ username: user.username }),
    {
      cookie: getCookieHeader(),
      params: mergeLeft(
        mapQueryConstraintsToQueryParams({
          // creator.username is needed for the query to work - do not remove
          orderBy: [
            { field: 'creator.username', direction: 'asc' },
            { field: 'expiresAt', direction: 'desc' }
          ]
        }),
        {
          as: LISTING_FILTER_AS_TARGET,
          notState: [LISTING_STATE_FULFILLED, LISTING_STATE_CANCELLED, LISTING_STATE_EXPIRED]
        }
      )
    }
  )
  assertNextFetchResponse(response)
  return <ProfileListingsReceivedApiProvided listings={response.data.listings} />
}

export default ProfileListingsReceivedPage
