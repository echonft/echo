import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import { type OfferResponse } from '@echo/api/types/responses/offer-response'
import { authOptions } from '@echo/frontend/lib/constants/auth-options'
import { redirectIfNotLoggedIn } from '@echo/frontend/lib/helpers/auth/redirect-if-not-logged-in'
import { assertNextFetchResponse } from '@echo/frontend/lib/services/fetch/assert-next-fetch-response'
import { nextFetch } from '@echo/frontend/lib/services/fetch/next-fetch'
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
  const response = await nextFetch.get<OfferResponse>(apiUrlProvider.offer.get.get({ offerId: id }), {
    bearerToken: session.user.sessionToken
  })
  assertNextFetchResponse(response)
  return <OfferDetailsApiProvided offer={response.data.offer} user={session.user} />
}

export default OfferDetailsPage
