import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { PaddedContainer } from '@echo/ui/components/layout/padded-container'
import { ListingDetailsSkeleton } from '@echo/ui/components/listing/details/skeleton/listing-details-skeleton'

function render() {
  return (
    <PaddedContainer>
      <ListingDetailsSkeleton />
    </PaddedContainer>
  )
}

export default withLocale(render)
