'use client'
import { linkProvider } from '@echo/api/services/routing/link-provider'
import type { AuthUser } from '@echo/model/types/auth-user'
import { type Listing } from '@echo/model/types/listing'
import { ListingRowsLayout } from '@echo/ui/components/listing/layout/listing-rows-layout'
import { ListingRowSwitch } from '@echo/ui/components/listing/row/listing-row-switch'
import { map } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  listings: Listing[]
  user: AuthUser | undefined
}

// TODO Delete
export const ListingRowsContainer: FunctionComponent<Props> = ({ listings }) => {
  return (
    <>
      <ListingRowsLayout>
        {map(
          (listing) => (
            <ListingRowSwitch
              key={listing.id}
              listing={listing}
              path={linkProvider.listing.details.getUrl({ listingId: listing.id })}
            />
          ),
          listings
        )}
      </ListingRowsLayout>
    </>
  )
}
