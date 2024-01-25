import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { NAVIGATION_NFTS } from '@echo/ui/constants/navigation-item'
import { UserNavigationLayoutSkeleton } from '@echo/ui/pages/user/navigation/user-navigation-layout-skeleton'
import { UserNftsSkeleton } from '@echo/ui/pages/user/nfts/user-nfts-skeleton'

function render() {
  return (
    <UserNavigationLayoutSkeleton activeNavigationItem={NAVIGATION_NFTS}>
      <UserNftsSkeleton />
    </UserNavigationLayoutSkeleton>
  )
}

export default withLocale(render)
