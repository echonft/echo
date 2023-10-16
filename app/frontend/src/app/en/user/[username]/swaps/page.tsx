import { authOptions } from '@constants/auth-options'
import { userSwapsApiUrl } from '@echo/api/routing/user-swaps-api-url'
import type { OffersResponse } from '@echo/api/types/responses/offers-response'
import { UserSwapsApiProvided } from '@echo/ui/components/user/api-provided/user-swaps-api-provided'
import { fetcher } from '@helpers/fetcher'
import { mapQueryConstraintsToQueryParams } from '@helpers/request/map-query-constraints-to-query-params'
import { getServerSession } from 'next-auth/next'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

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

  const { data, error } = await fetcher(userSwapsApiUrl(username))
    .revalidate(3600)
    .query(constraintsQueryParams)
    .fetch<OffersResponse>()

  if (isNil(data)) {
    if (!isNil(error)) {
      throw Error(error.message)
    }
    throw Error()
  }

  return <UserSwapsApiProvided username={username} offers={data.offers} user={session?.user} />
}

export default UserSwapsPage
