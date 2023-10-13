import type { Offer } from '@echo/model/types/offer'
import { OfferRowsLayout } from '@echo/ui/components/offer/layout/offer-rows-layout'
import { SwapRow } from '@echo/ui/components/swap/row/swap-row'
import { map } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  offers: Offer[]
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
