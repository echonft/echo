import { mapQueryConstraintsToQueryParams } from '@echo/api/helpers/request/map-query-constraints-to-query-params'
import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import { linkProvider } from '@echo/api/services/routing/link-provider'
import { type OffersResponse } from '@echo/api/types/responses/offers-response'
import { getAuthUser } from '@echo/frontend/lib/helpers/auth/get-auth-user'
import { getCookieHeader } from '@echo/frontend/lib/helpers/auth/get-cookie-header'
import { assertNextFetchResponse } from '@echo/frontend/lib/services/fetch/assert-next-fetch-response'
import { nextFetch } from '@echo/frontend/lib/services/fetch/next-fetch'
import { UserSwapsApiProvided } from '@echo/ui/components/user/api-provided/user-swaps-api-provided'
import { redirect } from 'next/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'
import { type FunctionComponent } from 'react'

interface Props {
  params: {
    username: string
  }
}

const UserSwapsPage: FunctionComponent<Props> = async ({ params: { username } }) => {
  unstable_setRequestLocale('en')
  const user = await getAuthUser()
  if (user?.username === username) {
    redirect(linkProvider.profile.swaps.get())
  }
  const params = mapQueryConstraintsToQueryParams({
    orderBy: [{ field: 'expiresAt', direction: 'desc' }]
  })
  const response = await nextFetch.get<OffersResponse>(apiUrlProvider.user.swaps.getUrl({ username }), {
    cookie: getCookieHeader(),
    params
  })
  assertNextFetchResponse(response)
  return <UserSwapsApiProvided username={username} offers={response.data.offers} user={user} />
}

export default UserSwapsPage
