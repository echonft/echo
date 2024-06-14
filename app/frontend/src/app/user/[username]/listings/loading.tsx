import { ListingCardsContainerSkeleton } from '@echo/ui/components/listing/card/layout/skeleton/listing-cards-container-skeleton'
import { UserNavigationLayoutSkeleton } from '@echo/ui/pages/user/navigation/user-navigation-layout-skeleton'

export default function render() {
  return (
    <UserNavigationLayoutSkeleton>
      <ListingCardsContainerSkeleton />
    </UserNavigationLayoutSkeleton>
  )
}
