import { OfferCardsLayout } from '@echo/ui/components/offer/card/layout/offer-cards-layout'
import { OfferCard, type OfferCardProps } from '@echo/ui/components/offer/card/offer-card'
import { type OfferWithRole } from '@echo/ui/types/offer-with-role'
import { map } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props extends Pick<OfferCardProps, 'options'> {
  offers: OfferWithRole[]
}

export const OfferCardsContainer: FunctionComponent<Props> = ({ offers, options }) => {
  return (
    <OfferCardsLayout>
      {map(
        (offer) => (
          <OfferCard offer={offer} options={options} />
        ),
        offers
      )}
    </OfferCardsLayout>
  )
}
