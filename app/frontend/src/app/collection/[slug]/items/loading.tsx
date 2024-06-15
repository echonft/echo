import { CollectionNavigationLayoutSkeleton } from '@echo/ui/pages/collection/navigation/collection-navigation-layout-skeleton'
import { CollectionNftsSkeleton } from '@echo/ui/pages/collection/nfts/skeleton/collection-nfts-skeleton'

export default function render() {
  return (
    <CollectionNavigationLayoutSkeleton>
      <CollectionNftsSkeleton />
    </CollectionNavigationLayoutSkeleton>
  )
}
