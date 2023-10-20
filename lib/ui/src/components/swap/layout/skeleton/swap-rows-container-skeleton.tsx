import { OfferRowsLayout } from '@echo/ui/components/offer/layout/offer-rows-layout'
import { SwapRowSkeleton } from '@echo/ui/components/swap/row/skeleton/swap-row-skeleton'
import { type FunctionComponent } from 'react'

export const SwapRowsContainerSkeleton: FunctionComponent = () => {
  return (
    <OfferRowsLayout>
      <SwapRowSkeleton />
    </OfferRowsLayout>
  )
}
