import { BackButtonLayout } from '@echo/ui/components/layout/back-button-layout'
import { DetailsPaddedContainer } from '@echo/ui/components/layout/details-padded-container'
import { SectionLayout } from '@echo/ui/components/layout/section-layout'
import { NavigationPageLayout } from '@echo/ui/components/navigation/navigation-page-layout'
import { OfferDetailsSkeleton } from '@echo/ui/components/offer/details/skeleton/offer-details-skeleton'
import { unstable_setRequestLocale } from 'next-intl/server'
import { type FunctionComponent } from 'react'

const OfferDetailsLoading: FunctionComponent = () => {
  unstable_setRequestLocale('en')
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

export default OfferDetailsLoading
