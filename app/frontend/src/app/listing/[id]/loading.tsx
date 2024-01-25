import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { ListingDetailsSkeleton } from '@echo/ui/components/listing/details/skeleton/listing-details-skeleton'

function render() {
  return <ListingDetailsSkeleton />
}

export default withLocale(render)
