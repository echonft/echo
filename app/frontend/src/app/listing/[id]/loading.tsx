import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { PaddedSectionLayout } from '@echo/ui/components/base/layout/padded-section-layout'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { ListingDetailsSkeleton } from '@echo/ui/components/listing/details/skeleton/listing-details-skeleton'

function render() {
  return (
    <PageLayout>
      <PaddedSectionLayout>
        <ListingDetailsSkeleton />
      </PaddedSectionLayout>
    </PageLayout>
  )
}

export default withLocale(render)
