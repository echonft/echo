import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { ProfileListingsSkeleton } from '@echo/ui/components/profile/listing/skeleton/profile-listings-skeleton'
import { NAVIGATION_LISTINGS_RECEIVED } from '@echo/ui/constants/navigation-item'

function render() {
  return <ProfileListingsSkeleton activeNavigationItem={NAVIGATION_LISTINGS_RECEIVED} />
}

export default withLocale(render)
