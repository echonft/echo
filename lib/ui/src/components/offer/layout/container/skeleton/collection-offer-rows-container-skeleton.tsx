import { OfferCollectionRowSkeleton } from '../../../row/skeleton/offer-collection-row-skeleton'
import { OfferRowsLayout } from '../../offer-rows-layout'
import { FunctionComponent } from 'react'

export const CollectionOfferRowsContainerSkeleton: FunctionComponent = () => {
  return (
    <OfferRowsLayout>
      <OfferCollectionRowSkeleton />
    </OfferRowsLayout>
  )
}
