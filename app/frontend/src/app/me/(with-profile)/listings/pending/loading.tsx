import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { NAVIGATION_LISTINGS_RECEIVED } from '@echo/ui/constants/navigation-item'
import { ProfileListingsSkeleton } from '@echo/ui/pages/profile/listings/profile-listings-skeleton'
import { ProfileNavigationLayoutSkeleton } from '@echo/ui/pages/profile/navigation/profile-navigation-layout-skeleton'

function render() {
  return (
    <ProfileNavigationLayoutSkeleton activeNavigationItem={NAVIGATION_LISTINGS_RECEIVED}>
      <ProfileListingsSkeleton />
    </ProfileNavigationLayoutSkeleton>
  )
}

export default withLocale(render)
