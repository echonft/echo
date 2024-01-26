import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { OfferDetailsSkeleton } from '@echo/ui/components/offer/details/skeleton/offer-details-skeleton'

function render() {
  // FIXME need to create a skeleton
  return <OfferDetailsSkeleton />
}

export default withLocale(render)
