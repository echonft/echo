import { NftCardSkeleton } from '@echo/ui/components/nft/card/skeleton/nft-card-skeleton'
import { OfferCardsLayout } from '@echo/ui/components/offer/card/layout/offer-cards-layout'
import { type FunctionComponent } from 'react'

// TODO Probably the skeleton card could be better. It could maybe include a separation for the image
// and a loading user tag and state tag. Will do for now.
export const OfferCardsContainerSkeleton: FunctionComponent = () => {
  return (
    <OfferCardsLayout>
      <NftCardSkeleton />
      <NftCardSkeleton />
      <NftCardSkeleton />
    </OfferCardsLayout>
  )
}
