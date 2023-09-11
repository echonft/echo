import { OfferRowSkeleton } from '../../../row/skeleton/offer-row-skeleton'
import { OfferRowsLayout } from '../../offer-rows-layout'
import { FunctionComponent } from 'react'

export const OfferRowsContainerSkeleton: FunctionComponent = () => {
  return (
    <OfferRowsLayout>
      <OfferRowSkeleton />
    </OfferRowsLayout>
  )
}
