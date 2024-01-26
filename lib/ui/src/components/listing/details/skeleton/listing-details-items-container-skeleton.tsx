import { CardsLayout } from '@echo/ui/components/base/card/layout/cards-layout'
import { NftThumbnailSkeleton } from '@echo/ui/components/nft/thumbnail/skeleton/nft-thumbnail-skeleton'
import { ALIGNMENT_CENTER } from '@echo/ui/constants/alignments'
import { type FunctionComponent } from 'react'

export const ListingDetailsItemsContainerSkeleton: FunctionComponent = () => {
  return (
    <CardsLayout alignment={ALIGNMENT_CENTER}>
      <NftThumbnailSkeleton />
      <NftThumbnailSkeleton />
      <NftThumbnailSkeleton />
    </CardsLayout>
  )
}
