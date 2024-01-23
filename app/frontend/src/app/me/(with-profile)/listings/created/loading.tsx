import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import { ProfileListingsSkeleton } from '@echo/ui/components/profile/listing/skeleton/profile-listings-skeleton'
import { NAVIGATION_LISTINGS_CREATED } from '@echo/ui/constants/navigation-item'

export default async function () {
  await initializeServerComponent()
  return <ProfileListingsSkeleton activeNavigationItem={NAVIGATION_LISTINGS_CREATED} />
}
