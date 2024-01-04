import { PaddedContainer } from '@echo/ui/components/layout/padded-container'
import { OfferDetailsSkeleton } from '@echo/ui/components/offer/details/skeleton/offer-details-skeleton'
import { unstable_setRequestLocale } from 'next-intl/server'
import { type FunctionComponent } from 'react'

const OfferDetailsLoading: FunctionComponent = () => {
  unstable_setRequestLocale('en')
  return (
    <PaddedContainer>
      <OfferDetailsSkeleton />
    </PaddedContainer>
  )
}

export default OfferDetailsLoading
