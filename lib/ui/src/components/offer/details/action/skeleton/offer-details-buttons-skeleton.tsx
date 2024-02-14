import { OfferDetailsButtonsLayout } from '@echo/ui/components/offer/details/layout/offer-details-buttons-layout'
import { classes } from '@echo/ui/helpers/classes'
import type { FunctionComponent } from 'react'

export const OfferDetailsButtonsSkeleton: FunctionComponent = () => {
  return (
    <OfferDetailsButtonsLayout>
      <div className={classes('bg-transparent', 'w-full', 'h-[3.75rem]')} />
    </OfferDetailsButtonsLayout>
  )
}
