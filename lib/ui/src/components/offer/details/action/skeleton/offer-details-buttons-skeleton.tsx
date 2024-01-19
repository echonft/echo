import { OfferDetailsButtonsLayout } from '@echo/ui/components/offer/details/layout/offer-details-buttons-layout'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

export const OfferDetailsButtonsSkeleton: FunctionComponent = () => {
  return (
    <OfferDetailsButtonsLayout>
      <div className={clsx('bg-transparent', 'w-full', 'h-[3.75rem]')} />
    </OfferDetailsButtonsLayout>
  )
}
