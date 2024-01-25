import { OfferCardsLayout } from '@echo/ui/components/offer/card/layout/offer-cards-layout'
import { SwapRowSkeleton } from '@echo/ui/components/swap/row/skeleton/swap-row-skeleton'
import { type FunctionComponent } from 'react'

export const SwapRowsContainerSkeleton: FunctionComponent = () => {
  return (
    <OfferCardsLayout>
      <SwapRowSkeleton />
    </OfferCardsLayout>
  )
}
