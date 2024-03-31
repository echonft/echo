import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { UserNavigationLayoutSkeleton } from '@echo/ui/pages/user/navigation/user-navigation-layout-skeleton'
import { UserNftsSkeleton } from '@echo/ui/pages/user/nfts/skeleton/user-nfts-skeleton'

function render() {
  return (
    <UserNavigationLayoutSkeleton>
      <UserNftsSkeleton />
    </UserNavigationLayoutSkeleton>
  )
}

export default withLocale(render)
