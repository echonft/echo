import { OfferRowsLayout } from '@echo/ui/components/offer/layout/offer-rows-layout'
import { SwapRow } from '@echo/ui/components/swap/row/swap-row'
import type { Offer } from '@echo/ui/types/model/offer'
import { map } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  offers: Array<Offer>
}

export const SwapRowsContainer: FunctionComponent<Props> = ({ offers }) => {
  return (
    <OfferRowsLayout>
      {map(
        (offer) => (
          <SwapRow key={offer.id} offer={offer} />
        ),
        offers
      )}
    </OfferRowsLayout>
  )
}
