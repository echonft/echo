import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { CollectionListingsSkeleton } from '@echo/ui/components/collection/listing/skeleton/collection-listings-skeleton'

function render() {
  return <CollectionListingsSkeleton />
}

export default withLocale(render)
