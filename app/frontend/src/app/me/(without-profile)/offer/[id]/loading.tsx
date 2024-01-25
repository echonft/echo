import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { BackButtonLayout } from '@echo/ui/components/base/layout/back-button-layout'
import { DetailsPaddedContainer } from '@echo/ui/components/base/layout/details-padded-container'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { NavigationPageLayout } from '@echo/ui/components/base/navigation/navigation-page-layout'
import { OfferDetailsSkeleton } from '@echo/ui/components/offer/details/skeleton/offer-details-skeleton'

function render() {
  // FIXME need to create a skeleton
  return (
    <NavigationPageLayout user={undefined}>
      <SectionLayout>
        <DetailsPaddedContainer>
          <BackButtonLayout>
            <OfferDetailsSkeleton />
          </BackButtonLayout>
        </DetailsPaddedContainer>
      </SectionLayout>
    </NavigationPageLayout>
  )
}

export default withLocale(render)
