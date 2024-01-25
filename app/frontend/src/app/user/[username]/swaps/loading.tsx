import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { OfferCardsContainerSkeleton } from '@echo/ui/components/offer/card/layout/skeleton/offer-cards-container-skeleton'
import { NAVIGATION_SWAPS } from '@echo/ui/constants/navigation-item'
import { UserNavigationLayoutSkeleton } from '@echo/ui/pages/user/navigation/user-navigation-layout-skeleton'

function render() {
  return (
    <UserNavigationLayoutSkeleton activeNavigationItem={NAVIGATION_SWAPS}>
      <OfferCardsContainerSkeleton />
    </UserNavigationLayoutSkeleton>
  )
}

export default withLocale(render)
