import { CardsLayout } from '@echo/ui/components/base/card/layout/cards-layout'
import { NftCardSkeleton } from '@echo/ui/components/nft/card/skeleton/nft-card-skeleton'
import { type FunctionComponent } from 'react'

export const OfferCardsContainerSkeleton: FunctionComponent = () => {
  return (
    <CardsLayout>
      <NftCardSkeleton />
      <NftCardSkeleton />
      <NftCardSkeleton />
    </CardsLayout>
  )
}
