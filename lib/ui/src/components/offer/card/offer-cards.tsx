'use client'
import type { Offer } from '@echo/model/types/offer'
import { CardsLayout } from '@echo/ui/components/base/card/layout/cards-layout'
import { OfferCard } from '@echo/ui/components/offer/card/offer-card'
import { map } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  offers: Offer[]
  onSelect?: (slug: Lowercase<string>) => void
}

export const OfferCards: FunctionComponent<Props> = ({ offers, onSelect }) => {
  return (
    <CardsLayout>
      {map(
        (offer) => (
          <OfferCard key={offer.slug} offer={offer} onSelect={onSelect} />
        ),
        offers
      )}
    </CardsLayout>
  )
}
