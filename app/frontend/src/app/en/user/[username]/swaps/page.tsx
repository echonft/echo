import { userSwapsApiUrl } from '@echo/api/routing/user-swaps-api-url'
import { type OffersResponse } from '@echo/api/types/responses/offers-response'
import { authOptions } from '@echo/frontend/lib/constants/auth-options'
import { mapQueryConstraintsToQueryParams } from '@echo/frontend/lib/helpers/request/map-query-constraints-to-query-params'
import { assertFetchResult } from '@echo/frontend/lib/services/fetcher/assert-fetch-result'
import { fetcher } from '@echo/frontend/lib/services/fetcher/fetcher'
import { UserSwapsApiProvided } from '@echo/ui/components/user/api-provided/user-swaps-api-provided'
import { getServerSession } from 'next-auth/next'
import { type FunctionComponent } from 'react'

interface Props {
  params: {
    username: string
  }
}

const UserSwapsPage: FunctionComponent<Props> = async ({ params: { username } }) => {
  const session = await getServerSession(authOptions)
  const constraintsQueryParams = mapQueryConstraintsToQueryParams({
    orderBy: [{ field: 'expiresAt' }]
  })
  const result = await fetcher(userSwapsApiUrl(username)).query(constraintsQueryParams).fetch<OffersResponse>()
  assertFetchResult(result)
  return <UserSwapsApiProvided username={username} offers={result.data.offers} user={session?.user} />
}

export default UserSwapsPage
