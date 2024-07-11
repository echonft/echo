import { CardsSkeleton } from '@echo/ui/components/base/card/skeleton/cards-skeleton'
import { OfferDetailsButtonsSkeleton } from '@echo/ui/components/offer/details/action/skeleton/offer-details-buttons-skeleton'
import { OfferDetailsItemsButtonsLayout } from '@echo/ui/components/offer/details/layout/offer-details-items-buttons-layout'
import { OfferDetailsLayout } from '@echo/ui/components/offer/details/layout/offer-details-layout'
import { OfferDetailsItemsSeparator } from '@echo/ui/components/offer/details/offer-details-items-separator'
import { UserDetailsSkeleton } from '@echo/ui/components/user/details/skeleton/user-details-skeleton'
import { ALIGNMENT_CENTER } from '@echo/ui/constants/alignments'
import { type FunctionComponent } from 'react'

export const OfferDetailsSkeleton: FunctionComponent = () => (
  <OfferDetailsLayout>
    <UserDetailsSkeleton />
    <OfferDetailsItemsButtonsLayout>
      <CardsSkeleton alignment={ALIGNMENT_CENTER} />
      <OfferDetailsItemsSeparator />
      <CardsSkeleton alignment={ALIGNMENT_CENTER} />
      <OfferDetailsButtonsSkeleton />
    </OfferDetailsItemsButtonsLayout>
  </OfferDetailsLayout>
)
