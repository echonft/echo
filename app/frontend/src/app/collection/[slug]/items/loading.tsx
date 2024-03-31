import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { CollectionNavigationLayoutSkeleton } from '@echo/ui/pages/collection/navigation/collection-navigation-layout-skeleton'
import { CollectionNftsSkeleton } from '@echo/ui/pages/collection/nfts/skeleton/collection-nfts-skeleton'

function render() {
  return (
    <CollectionNavigationLayoutSkeleton>
      <CollectionNftsSkeleton />
    </CollectionNavigationLayoutSkeleton>
  )
}

export default withLocale(render)
