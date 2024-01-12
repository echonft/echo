import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import { linkProvider } from '@echo/api/services/routing/link-provider'
import { type OfferResponse } from '@echo/api/types/responses/offer-response'
import { getAuthUser } from '@echo/frontend/lib/helpers/auth/get-auth-user'
import { getCookieHeader } from '@echo/frontend/lib/helpers/auth/get-cookie-header'
import { redirectIfNotLoggedIn } from '@echo/frontend/lib/helpers/auth/redirect-if-not-logged-in'
import { assertNextFetchResponse } from '@echo/frontend/lib/services/fetch/assert-next-fetch-response'
import { nextFetch } from '@echo/frontend/lib/services/fetch/next-fetch'
import { OfferDetailsApiProvided } from '@echo/ui/components/offer/api-provided/offer-details-api-provided'
import { unstable_setRequestLocale } from 'next-intl/server'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  params: {
    id: string
  }
}

const OfferDetailsPage: FunctionComponent<PropsWithChildren<Props>> = async ({ params: { id } }) => {
  unstable_setRequestLocale('en')
  const user = await getAuthUser()
  redirectIfNotLoggedIn(user, linkProvider.profile.offer.getUrl({ offerId: id }))
  const response = await nextFetch.get<OfferResponse>(apiUrlProvider.offer.get.getUrl({ offerId: id }), {
    cookie: getCookieHeader()
  })
  assertNextFetchResponse(response)
  return <OfferDetailsApiProvided offer={response.data.offer} user={user} />
}

export default OfferDetailsPage
