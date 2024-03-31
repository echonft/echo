import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { PaddedSectionLayout } from '@echo/ui/components/base/layout/padded-section-layout'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { OfferDetailsSkeleton } from '@echo/ui/components/offer/details/skeleton/offer-details-skeleton'

function render() {
  return (
    <PageLayout>
      <PaddedSectionLayout>
        <OfferDetailsSkeleton />
      </PaddedSectionLayout>
    </PageLayout>
  )
}

export default withLocale(render)
