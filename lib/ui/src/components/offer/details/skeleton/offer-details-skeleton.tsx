import { CardsSkeleton } from '@echo/ui/components/base/card/skeleton/cards-skeleton'
import { ItemsSeparator } from '@echo/ui/components/base/items-separator'
import { OfferDetailsInfoLayout } from '@echo/ui/components/offer/details/layout/offer-details-info-layout'
import { OfferDetailsLayout } from '@echo/ui/components/offer/details/layout/offer-details-layout'
import { OfferDetailsUserInfoLayout } from '@echo/ui/components/offer/details/layout/offer-details-user-info-layout'
import { OfferDetailsStateSkeleton } from '@echo/ui/components/offer/details/skeleton/offer-details-state-skeleton'
import { UserDetailsSkeleton } from '@echo/ui/components/user/details/skeleton/user-details-skeleton'
import { ALIGNMENT_LEFT } from '@echo/ui/constants/alignments'
import { type FunctionComponent } from 'react'

export const OfferDetailsSkeleton: FunctionComponent = () => (
  <OfferDetailsLayout>
    <OfferDetailsStateSkeleton />
    <OfferDetailsInfoLayout>
      <OfferDetailsUserInfoLayout>
        <UserDetailsSkeleton />
        <CardsSkeleton alignment={ALIGNMENT_LEFT} />
      </OfferDetailsUserInfoLayout>
      <ItemsSeparator />
      <OfferDetailsUserInfoLayout>
        <UserDetailsSkeleton />
        <CardsSkeleton alignment={ALIGNMENT_LEFT} />
      </OfferDetailsUserInfoLayout>
    </OfferDetailsInfoLayout>
  </OfferDetailsLayout>
)
