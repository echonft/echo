import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { ListingCardsContainerSkeleton } from '@echo/ui/components/listing/card/layout/skeleton/listing-cards-container-skeleton'
import { NAVIGATION_LISTINGS_RECEIVED } from '@echo/ui/constants/navigation-item'
import { ProfileNavigationLayoutSkeleton } from '@echo/ui/pages/profile/navigation/profile-navigation-layout-skeleton'

function render() {
  return (
    <ProfileNavigationLayoutSkeleton activeNavigationItem={NAVIGATION_LISTINGS_RECEIVED}>
      <ListingCardsContainerSkeleton />
    </ProfileNavigationLayoutSkeleton>
  )
}

export default withLocale(render)
