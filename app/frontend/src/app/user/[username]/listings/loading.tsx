import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import { UserListingsSkeleton } from '@echo/ui/components/user/listing/skeleton/user-listings-skeleton'

export default async function () {
  await initializeServerComponent()
  return <UserListingsSkeleton />
}
