import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import type { NextLayoutParams } from '@echo/frontend/lib/types/next-layout-params'
import { SectionLayout } from '@echo/ui/components/layout/section-layout'
import { NewListingBannerManager } from '@echo/ui/components/listing/new/new-listing-banner-manager'
import { NavigationPageLayout } from '@echo/ui/components/navigation/navigation-page-layout'
import { NewOfferBannerManager } from '@echo/ui/components/offer/new/new-offer-banner-manager'
import { ProfileDetailsApiProvided } from '@echo/ui/components/profile/api-provided/profile-details-api-provided'

export default async function ({ children }: NextLayoutParams) {
  const user = await initializeServerComponent({ getAuthUser: true })
  return (
    <NavigationPageLayout user={user}>
      <NewOfferBannerManager />
      <NewListingBannerManager />
      <SectionLayout>
        <ProfileDetailsApiProvided user={user} />
      </SectionLayout>
      <SectionLayout>{children}</SectionLayout>
    </NavigationPageLayout>
  )
}
