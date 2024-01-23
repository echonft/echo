import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import { BackButtonLayout } from '@echo/ui/components/layout/back-button-layout'
import { DetailsPaddedContainer } from '@echo/ui/components/layout/details-padded-container'
import { SectionLayout } from '@echo/ui/components/layout/section-layout'
import { NavigationPageLayout } from '@echo/ui/components/navigation/navigation-page-layout'
import { OfferDetailsSkeleton } from '@echo/ui/components/offer/details/skeleton/offer-details-skeleton'

async function render() {
  await initializeServerComponent()
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
