import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import { UserListingsSkeleton } from '@echo/ui/components/user/listing/skeleton/user-listings-skeleton'

async function render() {
  await initializeServerComponent()
  return <UserListingsSkeleton />
}

export default withLocale(render)
