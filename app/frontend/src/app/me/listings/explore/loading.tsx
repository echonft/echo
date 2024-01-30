import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { ListingCardsContainerSkeleton } from '@echo/ui/components/listing/card/layout/skeleton/listing-cards-container-skeleton'
import { ProfileNavigationLayoutSkeleton } from '@echo/ui/pages/profile/navigation/profile-navigation-layout-skeleton'

function render() {
  return (
    <ProfileNavigationLayoutSkeleton>
      <ListingCardsContainerSkeleton />
    </ProfileNavigationLayoutSkeleton>
  )
}

export default withLocale(render)
