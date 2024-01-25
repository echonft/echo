import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { NAVIGATION_LISTINGS } from '@echo/ui/constants/navigation-item'
import { CollectionListingsSkeleton } from '@echo/ui/pages/collection/listings/collection-listings-skeleton'
import { CollectionNavigationLayoutSkeleton } from '@echo/ui/pages/collection/navigation/collection-navigation-layout-skeleton'

function render() {
  return (
    <CollectionNavigationLayoutSkeleton activeNavigationItem={NAVIGATION_LISTINGS}>
      <CollectionListingsSkeleton />
    </CollectionNavigationLayoutSkeleton>
  )
}

export default withLocale(render)
