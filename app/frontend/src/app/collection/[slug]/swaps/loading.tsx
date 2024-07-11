import { CardsSkeleton } from '@echo/ui/components/base/card/skeleton/cards-skeleton'
import { CollectionNavigationLayoutSkeleton } from '@echo/ui/pages/collection/navigation/collection-navigation-layout-skeleton'

export default function render() {
  return (
    <CollectionNavigationLayoutSkeleton>
      <CardsSkeleton />
    </CollectionNavigationLayoutSkeleton>
  )
}
