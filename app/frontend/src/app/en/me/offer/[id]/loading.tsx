import { PaddedContainer } from '@echo/ui/components/layout/padded-container'
import { OfferDetailsSkeleton } from '@echo/ui/components/offer/details/skeleton/offer-details-skeleton'
import { type FunctionComponent } from 'react'

const OfferDetailsLoading: FunctionComponent = () => {
  return (
    <PaddedContainer>
      <OfferDetailsSkeleton />
    </PaddedContainer>
  )
}

export default OfferDetailsLoading
