import { OfferDetailsSkeleton } from '@echo/ui/src/components/offer/details/skeleton/offer-details-skeleton'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

const OfferLoading: FunctionComponent = () => {
  return (
    <section className={clsx('w-full')}>
      <OfferDetailsSkeleton />
    </section>
  )
}

export default OfferLoading
