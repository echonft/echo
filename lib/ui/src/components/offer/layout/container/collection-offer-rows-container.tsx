import { OfferCollectionRow } from '../../row/offer-collection-row'
import { OfferRowsLayout } from '../offer-rows-layout'
import { Offer } from '@echo/ui-model'
import { map } from 'ramda'
import { FunctionComponent } from 'react'

interface Props {
  offers: Array<Offer>
}

export const CollectionOfferRowsContainer: FunctionComponent<Props> = ({ offers }) => {
  return (
    <OfferRowsLayout>
      {map(
        (offer) => (
          <OfferCollectionRow key={offer.id} offer={offer} />
        ),
        offers
      )}
    </OfferRowsLayout>
  )
}
