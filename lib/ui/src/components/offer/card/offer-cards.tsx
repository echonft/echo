'use client'
import { CardsLayout } from '@echo/ui/components/base/card/layout/cards-layout'
import { OfferCard, type OfferCardProps } from '@echo/ui/components/offer/card/offer-card'
import { type OfferWithRole } from '@echo/ui/types/offer-with-role'
import { map } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props extends Pick<OfferCardProps, 'options'> {
  offers: OfferWithRole[]
  onSelect?: (offer: OfferWithRole) => unknown
}

export const OfferCards: FunctionComponent<Props> = ({ offers, options, onSelect }) => {
  return (
    <CardsLayout>
      {map(
        (offer) => (
          <OfferCard key={offer.slug} offer={offer} options={options} onSelect={onSelect} />
        ),
        offers
      )}
    </CardsLayout>
  )
}
