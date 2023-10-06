import { authOptions } from '@constants/auth-options'
import { offerApiUrl } from '@echo/api/routing/offer-api-url'
import type { GetOfferResponse } from '@echo/api/types/responses/get-offer-response'
import { OfferDetailsApiProvided } from '@echo/ui/components/offer/api-provided/offer-details-api-provided'
import { fetcher } from '@helpers/fetcher'
import { getServerSession } from 'next-auth/next'
import { isNil } from 'ramda'
import type { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  params: {
    id: string
  }
}

const OfferPage: FunctionComponent<PropsWithChildren<Props>> = async ({ params: { id } }) => {
  const session = await getServerSession(authOptions)
  const { data, error } = await fetcher(offerApiUrl(id)).fetch<GetOfferResponse>()

  if (isNil(data)) {
    if (!isNil(error)) {
      throw Error(error.message)
    }
    throw Error()
  }
  return <OfferDetailsApiProvided offerResponse={data.offer} user={session!.user} />
}

export default OfferPage
