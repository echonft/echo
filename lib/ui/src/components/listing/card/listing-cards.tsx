'use client'
import type { Listing } from '@echo/model/types/listing'
import { CardsLayout } from '@echo/ui/components/base/card/layout/cards-layout'
import { ListingCard } from '@echo/ui/components/listing/card/listing-card'
import { map } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  listings: Listing[]
  onSelect?: (slug: Lowercase<string>) => void
}

export const ListingCards: FunctionComponent<Props> = ({ listings, onSelect }) => {
  return (
    <CardsLayout>
      {map(
        (listing) => (
          <ListingCard key={listing.slug} listing={listing} onSelect={onSelect} />
        ),
        listings
      )}
    </CardsLayout>
  )
}
