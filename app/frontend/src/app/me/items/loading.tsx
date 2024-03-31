import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { ProfileNavigationLayoutSkeleton } from '@echo/ui/pages/profile/navigation/profile-navigation-layout-skeleton'
import { ProfileNftsSkeleton } from '@echo/ui/pages/profile/nfts/skeleton/profile-nfts-skeleton'

function render() {
  return (
    <ProfileNavigationLayoutSkeleton>
      <ProfileNftsSkeleton />
    </ProfileNavigationLayoutSkeleton>
  )
}

export default withLocale(render)
