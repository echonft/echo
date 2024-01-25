import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { NextLayoutParams } from '@echo/frontend/lib/types/next-layout-params'
import type { NextUserParams } from '@echo/frontend/lib/types/next-user-params'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { NavigationPageLayout } from '@echo/ui/components/base/navigation/navigation-page-layout'
import { NewListingBannerManager } from '@echo/ui/components/listing/new/new-listing-banner-manager'
import { NewOfferBannerManager } from '@echo/ui/components/offer/new/new-offer-banner-manager'
import { ProfileDetails } from '@echo/ui/pages/profile/profile-details'
import { pipe } from 'ramda'
import type { ReactElement } from 'react'

function render({ user, children }: NextUserParams<NextLayoutParams>) {
  return (
    <NavigationPageLayout user={user}>
      <NewOfferBannerManager />
      <NewListingBannerManager />
      <SectionLayout>
        <ProfileDetails user={user} />
      </SectionLayout>
      <SectionLayout>{children}</SectionLayout>
    </NavigationPageLayout>
  )
}

export default pipe(withLocale<NextUserParams<NextLayoutParams>, ReactElement>, withUser)(render)
