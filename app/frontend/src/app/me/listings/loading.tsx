import { ListingCardsContainerSkeleton } from '@echo/ui/components/listing/card/layout/skeleton/listing-cards-container-skeleton'
import { ProfileNavigationLayoutSkeleton } from '@echo/ui/pages/profile/navigation/profile-navigation-layout-skeleton'

export default function render() {
  return (
    <ProfileNavigationLayoutSkeleton>
      <ListingCardsContainerSkeleton />
    </ProfileNavigationLayoutSkeleton>
  )
}
