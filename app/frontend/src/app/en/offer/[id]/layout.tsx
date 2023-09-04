import { authOptions } from '../../../../lib/constants/auth-options'
import { fetcher } from '../../../../lib/helpers/fetcher'
import { ErrorStatus } from '../../../../lib/server/constants/error-status'
import { GetOfferResponse, offerApiUrl } from '@echo/api'
import { OfferDetailsApiProvided } from '@echo/ui'
import { clsx } from 'clsx'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { isNil } from 'ramda'
import { FunctionComponent, PropsWithChildren } from 'react'

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
      if (error.status === ErrorStatus.NOT_FOUND) {
        notFound()
      }
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
      <section className={clsx('w-full', 'pt-14')}>{children}</section>
    </>
  )
}

export default OfferLayout
