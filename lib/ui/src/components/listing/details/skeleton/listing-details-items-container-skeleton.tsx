import { CardsLayout } from '@echo/ui/components/base/card/layout/cards-layout'
import { NftCardSkeleton } from '@echo/ui/components/nft/card/skeleton/nft-card-skeleton'
import { ALIGNMENT_CENTER } from '@echo/ui/constants/alignments'
import { type FunctionComponent } from 'react'

export const ListingDetailsItemsContainerSkeleton: FunctionComponent = () => {
  return (
    <CardsLayout alignment={ALIGNMENT_CENTER}>
      <NftCardSkeleton />
      <NftCardSkeleton />
      <NftCardSkeleton />
    </CardsLayout>
  )
}
