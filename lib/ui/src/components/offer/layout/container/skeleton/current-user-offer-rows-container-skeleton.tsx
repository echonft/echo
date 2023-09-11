import { CurrentUserOfferRowSkeleton } from '../../../row/skeleton/current-user-offer-row-skeleton'
import { OfferRowsLayout } from '../../offer-rows-layout'
import { FunctionComponent } from 'react'

export const CurrentUserOfferRowsContainerSkeleton: FunctionComponent = () => {
  return (
    <OfferRowsLayout>
      <CurrentUserOfferRowSkeleton />
    </OfferRowsLayout>
  )
}
