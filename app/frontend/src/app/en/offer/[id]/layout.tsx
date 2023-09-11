import { authOptions } from '@constants/auth-options'
import { GetOfferResponse, offerApiUrl } from '@echo/api'
import { OfferDetailsApiProvided } from '@echo/ui/src/components/offer/details/offer-details-api-provided'
import { fetcher } from '@helpers/fetcher'
import { clsx } from 'clsx'
import { getServerSession } from 'next-auth/next'
import { isNil } from 'ramda'
import type { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  params: {
    offerId: string
  }
}

const OfferLayout: FunctionComponent<PropsWithChildren<Props>> = async ({ params: { offerId }, children }) => {
  const session = await getServerSession(authOptions)
  const { data, error } = await fetcher(offerApiUrl(offerId)).fetch<GetOfferResponse>()

  if (isNil(data)) {
    if (!isNil(error)) {
      throw Error(error.message)
    }
    throw Error()
  }

  return (
    <>
      <section className={clsx('w-full')}>
        {/* TODO Should there be a way to get non optional user if the route is authenticated */}
        <OfferDetailsApiProvided offerResponse={data.offer} user={session!.user} />
      </section>
      <section className={clsx('w-full')}>{children}</section>
    </>
  )
}

export default OfferLayout
