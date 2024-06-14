import { OfferCardsContainerSkeleton } from '@echo/ui/components/offer/card/layout/skeleton/offer-cards-container-skeleton'
import { UserNavigationLayoutSkeleton } from '@echo/ui/pages/user/navigation/user-navigation-layout-skeleton'

export default function render() {
  return (
    <UserNavigationLayoutSkeleton>
      <OfferCardsContainerSkeleton />
    </UserNavigationLayoutSkeleton>
  )
}
