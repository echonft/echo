import { ListingCardsContainerSkeleton } from '@echo/ui/components/listing/card/layout/skeleton/listing-cards-container-skeleton'
import { CollectionNavigationLayoutSkeleton } from '@echo/ui/pages/collection/navigation/collection-navigation-layout-skeleton'

export default function render() {
  return (
    <CollectionNavigationLayoutSkeleton>
      <ListingCardsContainerSkeleton />
    </CollectionNavigationLayoutSkeleton>
  )
}
