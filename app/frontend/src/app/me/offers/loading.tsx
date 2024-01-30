import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { OfferCardsContainerSkeleton } from '@echo/ui/components/offer/card/layout/skeleton/offer-cards-container-skeleton'
import { ProfileNavigationLayoutSkeleton } from '@echo/ui/pages/profile/navigation/profile-navigation-layout-skeleton'

function render() {
  return (
    <ProfileNavigationLayoutSkeleton>
      <OfferCardsContainerSkeleton />
    </ProfileNavigationLayoutSkeleton>
  )
}

export default withLocale(render)
