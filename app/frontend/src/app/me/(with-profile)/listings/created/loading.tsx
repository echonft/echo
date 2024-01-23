import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import { ProfileListingsSkeleton } from '@echo/ui/components/profile/listing/skeleton/profile-listings-skeleton'
import { NAVIGATION_LISTINGS_CREATED } from '@echo/ui/constants/navigation-item'

async function render() {
  await initializeServerComponent()
  return <ProfileListingsSkeleton activeNavigationItem={NAVIGATION_LISTINGS_CREATED} />
}

export default withLocale(render)
