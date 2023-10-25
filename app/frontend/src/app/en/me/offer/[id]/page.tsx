import { offerApiUrl } from '@echo/api/routing/offer-api-url'
import { type OfferResponse } from '@echo/api/types/responses/offer-response'
import { authOptions } from '@echo/frontend/lib/constants/auth-options'
import { redirectIfNotLoggedIn } from '@echo/frontend/lib/helpers/auth/redirect-if-not-logged-in'
import { fetcher } from '@echo/frontend/lib/helpers/fetcher'
import { ErrorStatus } from '@echo/frontend/lib/server/constants/error-status'
import { ApiError } from '@echo/frontend/lib/server/helpers/error/api-error'
import { OfferDetailsApiProvided } from '@echo/ui/components/offer/api-provided/offer-details-api-provided'
import { links } from '@echo/ui/constants/links'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { isNil } from 'ramda'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  params: {
    id: string
  }
}

const OfferDetailsPage: FunctionComponent<PropsWithChildren<Props>> = async ({ params: { id } }) => {
  const session = await getServerSession(authOptions)
  redirectIfNotLoggedIn(session, links.profile.offer(id))
  const { data, error } = await fetcher(offerApiUrl(id)).bearerToken(session.user.sessionToken).fetch<OfferResponse>()

  if (isNil(data)) {
    if (!isNil(error)) {
      if ((error as ApiError).status === ErrorStatus.FORBIDDEN) {
        notFound()
      } else {
        throw Error(error.message)
      }
    }
    throw Error()
  }
  return <OfferDetailsApiProvided offer={data.offer} user={session.user} />
}

export default OfferDetailsPage
