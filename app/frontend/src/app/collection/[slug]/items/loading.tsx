import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { NAVIGATION_NFTS } from '@echo/ui/constants/navigation-item'
import { CollectionNavigationLayoutSkeleton } from '@echo/ui/pages/collection/navigation/collection-navigation-layout-skeleton'
import { CollectionNftsSkeleton } from '@echo/ui/pages/collection/nfts/collection-nfts-skeleton'

function render() {
  return (
    <CollectionNavigationLayoutSkeleton activeNavigationItem={NAVIGATION_NFTS}>
      <CollectionNftsSkeleton />
    </CollectionNavigationLayoutSkeleton>
  )
}

export default withLocale(render)
