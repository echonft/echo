import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { DetailsPaddedContainer } from '@echo/ui/components/base/layout/details-padded-container'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { OfferDetailsSkeleton } from '@echo/ui/components/offer/details/skeleton/offer-details-skeleton'

function render() {
  return (
    <PageLayout>
      <SectionLayout>
        <DetailsPaddedContainer>
          <OfferDetailsSkeleton />
        </DetailsPaddedContainer>
      </SectionLayout>
    </PageLayout>
  )
}

export default withLocale(render)
