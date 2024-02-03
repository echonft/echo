import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { getUserProfile } from '@echo/frontend/lib/helpers/user/get-user-profile'
import type { NextAuthUserParams } from '@echo/frontend/lib/types/next-auth-user-params'
import type { NextLayoutParams } from '@echo/frontend/lib/types/next-layout-params'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { NavigationPageLayout } from '@echo/ui/components/base/navigation/navigation-page-layout'
import { CreateListingBannerManager } from '@echo/ui/components/listing/create/create-listing-banner-manager'
import { CreateOfferBannerManager } from '@echo/ui/components/offer/create/create-offer-banner-manager'
import { ProfileDetails } from '@echo/ui/pages/profile/profile-details'
import { pipe } from 'ramda'
import type { ReactElement } from 'react'

async function render({ user, children }: NextAuthUserParams<NextLayoutParams>) {
  const profile = await getUserProfile(user)
  return (
    <NavigationPageLayout user={user}>
      <CreateOfferBannerManager />
      <CreateListingBannerManager />
      <SectionLayout>
        <ProfileDetails profile={profile} />
      </SectionLayout>
      <SectionLayout>{children}</SectionLayout>
    </NavigationPageLayout>
  )
}

export default pipe(withLocale<NextAuthUserParams<NextLayoutParams>, Promise<ReactElement>>, withUser)(render)
