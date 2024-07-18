import { NavigationSectionLayout } from '@echo/ui/components/base/layout/navigation-section-layout'
import { ListingDetailsSkeleton } from '@echo/ui/components/listing/details/skeleton/listing-details-skeleton'

export default function render() {
  return (
    <NavigationSectionLayout>
      <ListingDetailsSkeleton />
    </NavigationSectionLayout>
  )
}
