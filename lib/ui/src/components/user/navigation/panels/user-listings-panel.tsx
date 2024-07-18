'use client'
import { ListingCards } from '@echo/ui/components/listing/card/listing-cards'
import { ListingDetailsModal } from '@echo/ui/components/listing/details/listing-details-modal'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import { TabPanel } from '@headlessui/react'
import { type FunctionComponent, useState } from 'react'

interface Props {
  listings: ListingWithRole[]
  show?: boolean
}

export const UserListingsPanel: FunctionComponent<Props> = ({ listings, show }) => {
  const [listing, setListing] = useState<ListingWithRole>()
  if (show) {
    return (
      <TabPanel>
        <ListingCards listings={listings} onSelect={setListing} />
        {/*TODO grab offers*/}
        <ListingDetailsModal
          listing={listing}
          offers={[]}
          onUpdate={setListing}
          onClose={() => {
            setListing(undefined)
          }}
        />
      </TabPanel>
    )
  }
  return null
}
