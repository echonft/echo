import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import { CollectionListingsSkeleton } from '@echo/ui/components/collection/listing/skeleton/collection-listings-skeleton'

async function render() {
  await initializeServerComponent()
  return <CollectionListingsSkeleton />
}

export default withLocale(render)
