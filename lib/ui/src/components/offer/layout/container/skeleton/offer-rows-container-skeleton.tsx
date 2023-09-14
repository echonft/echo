import { OfferRowsLayout } from '@echo/ui/components/offer/layout/offer-rows-layout'
import { OfferRowSkeleton } from '@echo/ui/components/offer/row/skeleton/offer-row-skeleton'
import type { FunctionComponent } from 'react'

export const OfferRowsContainerSkeleton: FunctionComponent = () => {
  return (
    <OfferRowsLayout>
      <OfferRowSkeleton />
    </OfferRowsLayout>
  )
}
