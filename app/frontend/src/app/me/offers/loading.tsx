import { OfferCardsContainerSkeleton } from '@echo/ui/components/offer/card/layout/skeleton/offer-cards-container-skeleton'
import { ProfileNavigationLayoutSkeleton } from '@echo/ui/pages/profile/navigation/profile-navigation-layout-skeleton'

export default function render() {
  return (
    <ProfileNavigationLayoutSkeleton>
      <OfferCardsContainerSkeleton />
    </ProfileNavigationLayoutSkeleton>
  )
}
