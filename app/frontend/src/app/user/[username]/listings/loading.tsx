import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { UserListingsSkeleton } from '@echo/ui/components/user/listing/skeleton/user-listings-skeleton'

function render() {
  return <UserListingsSkeleton />
}

export default withLocale(render)
