import { NavigationSectionLayout } from '@echo/ui/components/base/layout/navigation-section-layout'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { OfferDetailsSkeleton } from '@echo/ui/components/offer/details/skeleton/offer-details-skeleton'

export default function render() {
  return (
    <PageLayout>
      <NavigationSectionLayout>
        <OfferDetailsSkeleton />
      </NavigationSectionLayout>
    </PageLayout>
  )
}
