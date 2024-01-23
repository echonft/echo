import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import { ProfileOffersSkeleton } from '@echo/ui/components/profile/offer/skeleton/profile-offers-skeleton'
import { NAVIGATION_OFFERS_CREATED } from '@echo/ui/constants/navigation-item'

async function render() {
  await initializeServerComponent()
  return <ProfileOffersSkeleton activeNavigationItem={NAVIGATION_OFFERS_CREATED} />
}

export default withLocale(render)
