import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import { ProfileOffersSkeleton } from '@echo/ui/components/profile/offer/skeleton/profile-offers-skeleton'
import { NAVIGATION_OFFERS_CREATED } from '@echo/ui/constants/navigation-item'

export default async function () {
  await initializeServerComponent()
  return <ProfileOffersSkeleton activeNavigationItem={NAVIGATION_OFFERS_CREATED} />
}
