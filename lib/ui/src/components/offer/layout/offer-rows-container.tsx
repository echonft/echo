import { OfferRowsLayout } from '@echo/ui/components/offer/layout/offer-rows-layout'
import { OfferRow } from '@echo/ui/components/offer/row/offer-row'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { map } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  offers: Array<OfferWithRole>
}

export const OfferRowsContainer: FunctionComponent<Props> = ({ offers }) => {
  return (
    <OfferRowsLayout>
      {map(
        (offer) => (
          <OfferRow key={offer.id} offer={offer} />
        ),
        offers
      )}
    </OfferRowsLayout>
  )
}
