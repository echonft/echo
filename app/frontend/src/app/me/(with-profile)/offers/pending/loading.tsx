import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { ProfileOffersSkeleton } from '@echo/ui/components/profile/offer/skeleton/profile-offers-skeleton'
import { NAVIGATION_OFFERS_RECEIVED } from '@echo/ui/constants/navigation-item'

function render() {
  return <ProfileOffersSkeleton activeNavigationItem={NAVIGATION_OFFERS_RECEIVED} />
}

export default withLocale(render)
