import { mapQueryConstraintsToQueryParams } from '@echo/api/helpers/request/map-query-constraints-to-query-params'
import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import { type OffersResponse } from '@echo/api/types/responses/offers-response'
import { authOptions } from '@echo/frontend/lib/constants/auth-options'
import { assertNextFetchResponse } from '@echo/frontend/lib/services/fetch/assert-next-fetch-response'
import { nextFetch } from '@echo/frontend/lib/services/fetch/next-fetch'
import { UserSwapsApiProvided } from '@echo/ui/components/user/api-provided/user-swaps-api-provided'
import { links } from '@echo/ui/constants/links'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { type FunctionComponent } from 'react'

interface Props {
  params: {
    username: string
  }
}

const UserSwapsPage: FunctionComponent<Props> = async ({ params: { username } }) => {
  const session = await getServerSession(authOptions)
  if (session?.user?.username === username) {
    redirect(links.profile.swaps)
  }
  const params = mapQueryConstraintsToQueryParams({
    orderBy: [{ field: 'expiresAt', direction: 'desc' }]
  })
  const response = await nextFetch.get<OffersResponse>(apiUrlProvider.user.swaps.get({ username }), {
    params
  })
  assertNextFetchResponse(response)
  return <UserSwapsApiProvided username={username} offers={response.data.offers} user={session?.user} />
}

export default UserSwapsPage
