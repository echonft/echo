import { PaddedSectionLayout } from '@echo/ui/components/base/layout/padded-section-layout'
import { ListingDetailsSkeleton } from '@echo/ui/components/listing/details/skeleton/listing-details-skeleton'

export default function render() {
  return (
    <PaddedSectionLayout>
      <ListingDetailsSkeleton />
    </PaddedSectionLayout>
  )
}
