'use client'
import { CardsLayout } from '@echo/ui/components/base/card/layout/cards-layout'
import { ListingCard, type ListingCardProps } from '@echo/ui/components/listing/card/listing-card'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import { map } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props extends Pick<ListingCardProps<ListingWithRole>, 'options'> {
  listings: ListingWithRole[]
  onSelect?: (listing: ListingWithRole) => unknown
}

export const ListingCards: FunctionComponent<Props> = ({ listings, options, onSelect }) => {
  return (
    <CardsLayout>
      {map(
        (listing) => (
          <ListingCard key={listing.slug} listing={listing} options={options} onSelect={onSelect} />
        ),
        listings
      )}
    </CardsLayout>
  )
}
