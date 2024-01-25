import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { NAVIGATION_LISTINGS } from '@echo/ui/constants/navigation-item'
import { UserListingsSkeleton } from '@echo/ui/pages/user/listings/user-listings-skeleton'
import { UserNavigationLayoutSkeleton } from '@echo/ui/pages/user/navigation/user-navigation-layout-skeleton'

function render() {
  return (
    <UserNavigationLayoutSkeleton activeNavigationItem={NAVIGATION_LISTINGS}>
      <UserListingsSkeleton />
    </UserNavigationLayoutSkeleton>
  )
}

export default withLocale(render)
