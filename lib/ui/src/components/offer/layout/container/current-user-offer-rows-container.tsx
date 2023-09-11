import { OfferWithRole } from '../../../../types/offer-with-role'
import { CurrentUserOfferRow } from '../../row/current-user-offer-row'
import { OfferRowsLayout } from '../offer-rows-layout'
import { map } from 'ramda'
import { FunctionComponent } from 'react'

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
