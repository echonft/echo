import { PaddedContainer } from '../../layout/padded-container'
import { OfferSkeleton } from './offer-skeleton'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export const UserOffersSkeleton: FunctionComponent = () => {
  return (
    <PaddedContainer>
      <div className={clsx('h-full', 'w-full', 'flex', 'flex-col', 'gap-14')}>
        <OfferSkeleton />
        <OfferSkeleton />
        <OfferSkeleton />
      </div>
    </PaddedContainer>
  )
}
