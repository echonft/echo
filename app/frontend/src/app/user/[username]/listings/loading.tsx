import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { ListingCardsContainerSkeleton } from '@echo/ui/components/listing/card/layout/skeleton/listing-cards-container-skeleton'
import { UserNavigationLayoutSkeleton } from '@echo/ui/pages/user/navigation/user-navigation-layout-skeleton'

function render() {
  return (
    <UserNavigationLayoutSkeleton>
      <ListingCardsContainerSkeleton />
    </UserNavigationLayoutSkeleton>
  )
}

export default withLocale(render)
