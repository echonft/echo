import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { NAVIGATION_NFTS } from '@echo/ui/constants/navigation-item'
import { ProfileNavigationLayoutSkeleton } from '@echo/ui/pages/profile/navigation/profile-navigation-layout-skeleton'
import { ProfileNftsSkeleton } from '@echo/ui/pages/profile/nfts/profile-nfts-skeleton'

function render() {
  return (
    <ProfileNavigationLayoutSkeleton activeNavigationItem={NAVIGATION_NFTS}>
      <ProfileNftsSkeleton />
    </ProfileNavigationLayoutSkeleton>
  )
}

export default withLocale(render)
