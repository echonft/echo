import { ListingCardsLayout } from '@echo/ui/components/listing/card/layout/listing-cards-layout'
import { NftCardSkeleton } from '@echo/ui/components/nft/card/skeleton/nft-card-skeleton'
import { type FunctionComponent } from 'react'

// TODO Probably the skeleton card could be better. It could maybe include a separation for the image
// and a loading user tag and state tag. Will do for now.
export const ListingCardsContainerSkeleton: FunctionComponent = () => {
  return (
    <ListingCardsLayout>
      <NftCardSkeleton />
      <NftCardSkeleton />
      <NftCardSkeleton />
    </ListingCardsLayout>
  )
}
