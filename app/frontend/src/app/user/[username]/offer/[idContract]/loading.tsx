import { PaddedSectionLayout } from '@echo/ui/components/base/layout/padded-section-layout'
import { OfferDetailsSkeleton } from '@echo/ui/components/offer/details/skeleton/offer-details-skeleton'

export default function render() {
  return (
    <PaddedSectionLayout>
      <OfferDetailsSkeleton />
    </PaddedSectionLayout>
  )
}
