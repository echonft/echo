import { CardsLayout } from '@echo/ui/components/base/card/layout/cards-layout'
import { ListingCard, type ListingCardProps } from '@echo/ui/components/listing/card/listing-card'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import { map } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props extends Pick<ListingCardProps, 'options'> {
  listings: ListingWithRole[]
}

export const ListingCardsContainer: FunctionComponent<Props> = ({ listings, options }) => {
  return (
    <CardsLayout>
      {map(
        (listing) => (
          <ListingCard key={listing.id} listing={listing} options={options} />
        ),
        listings
      )}
    </CardsLayout>
  )
}
