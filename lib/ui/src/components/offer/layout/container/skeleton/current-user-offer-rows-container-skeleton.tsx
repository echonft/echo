import { OfferRowsLayout } from '@echo/ui/components/offer/layout/offer-rows-layout'
import { CurrentUserOfferRowSkeleton } from '@echo/ui/components/offer/row/skeleton/current-user-offer-row-skeleton'
import type { FunctionComponent } from 'react'

export const CurrentUserOfferRowsContainerSkeleton: FunctionComponent = () => {
  return (
    <OfferRowsLayout>
      <CurrentUserOfferRowSkeleton />
    </OfferRowsLayout>
  )
}
