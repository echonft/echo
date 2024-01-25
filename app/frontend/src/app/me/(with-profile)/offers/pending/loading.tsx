import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { NAVIGATION_OFFERS_RECEIVED } from '@echo/ui/constants/navigation-item'
import { ProfileNavigationLayoutSkeleton } from '@echo/ui/pages/profile/navigation/profile-navigation-layout-skeleton'
import { ProfileOffersSkeleton } from '@echo/ui/pages/profile/offers/profile-offers-skeleton'

function render() {
  return (
    <ProfileNavigationLayoutSkeleton activeNavigationItem={NAVIGATION_OFFERS_RECEIVED}>
      <ProfileOffersSkeleton />
    </ProfileNavigationLayoutSkeleton>
  )
}

export default withLocale(render)
