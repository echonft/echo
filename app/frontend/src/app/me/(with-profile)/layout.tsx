import { getAuthUser } from '@echo/frontend/lib/helpers/auth/get-auth-user'
import { SectionLayout } from '@echo/ui/components/layout/section-layout'
import { NewListingBannerManager } from '@echo/ui/components/listing/new/new-listing-banner-manager'
import { NavigationPageLayout } from '@echo/ui/components/navigation/navigation-page-layout'
import { NewOfferBannerManager } from '@echo/ui/components/offer/new/new-offer-banner-manager'
import { ProfileDetailsApiProvided } from '@echo/ui/components/profile/api-provided/profile-details-api-provided'
import { unstable_setRequestLocale } from 'next-intl/server'
import { type FunctionComponent, type PropsWithChildren } from 'react'

const ProfileLayout: FunctionComponent<PropsWithChildren> = async ({ children }) => {
  unstable_setRequestLocale('en')
  const user = await getAuthUser()
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

export default ProfileLayout
