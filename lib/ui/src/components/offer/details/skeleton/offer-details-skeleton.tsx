import { NftsContainerSkeleton } from '@echo/ui/components/nft/layout/skeleton/nfts-container-skeleton'
import { OfferDetailsButtonsSkeleton } from '@echo/ui/components/offer/details/action/skeleton/offer-details-buttons-skeleton'
import { OfferDetailsItemsButtonsLayout } from '@echo/ui/components/offer/details/layout/offer-details-items-buttons-layout'
import { OfferDetailsLayout } from '@echo/ui/components/offer/details/layout/offer-details-layout'
import { OfferDetailsItemsSeparator } from '@echo/ui/components/offer/details/offer-details-items-separator'
import { ListingOfferUserDetailsSkeleton } from '@echo/ui/components/user/listing-offer/skeleton/listing-offer-user-details-skeleton'
import { ALIGNMENT_CENTER } from '@echo/ui/constants/alignments'
import { type FunctionComponent } from 'react'

export const OfferDetailsSkeleton: FunctionComponent = () => (
  <OfferDetailsLayout>
    <ListingOfferUserDetailsSkeleton />
    <OfferDetailsItemsButtonsLayout>
      <NftsContainerSkeleton alignment={ALIGNMENT_CENTER} quantity={3} />
      <OfferDetailsItemsSeparator />
      <NftsContainerSkeleton alignment={ALIGNMENT_CENTER} quantity={3} />
      <OfferDetailsButtonsSkeleton />
    </OfferDetailsItemsButtonsLayout>
  </OfferDetailsLayout>
)
