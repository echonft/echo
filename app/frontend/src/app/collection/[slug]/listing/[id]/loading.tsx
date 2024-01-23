import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import { PaddedContainer } from '@echo/ui/components/layout/padded-container'
import { ListingDetailsSkeleton } from '@echo/ui/components/listing/details/skeleton/listing-details-skeleton'

async function render() {
  await initializeServerComponent()
  return (
    <PaddedContainer>
      <ListingDetailsSkeleton />
    </PaddedContainer>
  )
}

export default withLocale(render)
