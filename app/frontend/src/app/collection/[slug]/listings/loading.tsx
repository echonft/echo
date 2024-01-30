import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { ListingCardsContainerSkeleton } from '@echo/ui/components/listing/card/layout/skeleton/listing-cards-container-skeleton'
import { NAVIGATION_LISTINGS } from '@echo/ui/constants/navigation-item'
import { CollectionNavigationLayoutSkeleton } from '@echo/ui/pages/collection/navigation/collection-navigation-layout-skeleton'

function render() {
  return (
    <CollectionNavigationLayoutSkeleton activeNavigationItem={NAVIGATION_LISTINGS}>
      <ListingCardsContainerSkeleton />
    </CollectionNavigationLayoutSkeleton>
  )
}

export default withLocale(render)
