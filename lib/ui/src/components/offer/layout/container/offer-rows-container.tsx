import { OfferRow } from '../../row/offer-row'
import { OfferRowsLayout } from '../offer-rows-layout'
import { Offer } from '@echo/ui-model'
import { map } from 'ramda'
import { FunctionComponent } from 'react'

interface Props {
  offers: Array<Offer>
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
