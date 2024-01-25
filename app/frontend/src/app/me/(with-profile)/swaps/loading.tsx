import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { OfferCardsContainerSkeleton } from '@echo/ui/components/offer/card/layout/skeleton/offer-cards-container-skeleton'
import { NAVIGATION_SWAPS } from '@echo/ui/constants/navigation-item'
import { ProfileNavigationLayoutSkeleton } from '@echo/ui/pages/profile/navigation/profile-navigation-layout-skeleton'

function render() {
  return (
    <ProfileNavigationLayoutSkeleton activeNavigationItem={NAVIGATION_SWAPS}>
      <OfferCardsContainerSkeleton />
    </ProfileNavigationLayoutSkeleton>
  )
}

export default withLocale(render)
