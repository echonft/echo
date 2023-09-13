import { OfferRowsLayout } from '@echo/ui/components/offer/layout/offer-rows-layout'
import { CurrentUserOfferRow } from '@echo/ui/components/offer/row/current-user-offer-row'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { map } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  offers: Array<OfferWithRole>
}

export const CurrentUserOfferRowsContainer: FunctionComponent<Props> = ({ offers }) => {
  return (
    <OfferRowsLayout>
      {map(
        (offer) => (
          <CurrentUserOfferRow key={offer.id} offer={offer} />
        ),
        offers
      )}
    </OfferRowsLayout>
  )
}
