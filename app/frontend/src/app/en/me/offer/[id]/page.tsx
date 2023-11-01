import { offerApiUrl } from '@echo/api/routing/offer-api-url'
import { type OfferResponse } from '@echo/api/types/responses/offer-response'
import { authOptions } from '@echo/frontend/lib/constants/auth-options'
import { redirectIfNotLoggedIn } from '@echo/frontend/lib/helpers/auth/redirect-if-not-logged-in'
import { assertFetchResult } from '@echo/frontend/lib/services/fetcher/assert-fetch-result'
import { fetcher } from '@echo/frontend/lib/services/fetcher/fetcher'
import { OfferDetailsApiProvided } from '@echo/ui/components/offer/api-provided/offer-details-api-provided'
import { links } from '@echo/ui/constants/links'
import { getServerSession } from 'next-auth/next'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  params: {
    id: string
  }
}

const OfferDetailsPage: FunctionComponent<PropsWithChildren<Props>> = async ({ params: { id } }) => {
  const session = await getServerSession(authOptions)
  redirectIfNotLoggedIn(session, links.profile.offer(id))
  const result = await fetcher(offerApiUrl(id)).bearerToken(session.user.sessionToken).fetch<OfferResponse>()
  assertFetchResult(result)
  return <OfferDetailsApiProvided offer={result.data.offer} user={session.user} />
}

export default OfferDetailsPage
