import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import { CollectionListingsSkeleton } from '@echo/ui/components/collection/listing/skeleton/collection-listings-skeleton'

export default async function () {
  await initializeServerComponent()
  return <CollectionListingsSkeleton />
}
