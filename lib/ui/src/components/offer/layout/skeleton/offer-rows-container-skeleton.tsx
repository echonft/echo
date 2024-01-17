import { OfferRowSkeleton } from '@echo/ui/components/offer/card/skeleton/offer-row-skeleton'
import { OfferCardsLayout } from '@echo/ui/components/offer/layout/offer-cards-layout'
import { type FunctionComponent } from 'react'

export const OfferRowsContainerSkeleton: FunctionComponent = () => {
  return (
    <OfferCardsLayout>
      <OfferRowSkeleton />
    </OfferCardsLayout>
  )
}
