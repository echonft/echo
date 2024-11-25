'use client'
import { ListingCards } from '@echo/ui/components/listing/card/listing-cards'
import { ListingDetailsModal } from '@echo/ui/components/listing/details/listing-details-modal'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import type { Nullable } from '@echo/utils/types/nullable'
import { TabPanel } from '@headlessui/react'
import { clsx } from 'clsx'
import { find, isNil, nth, pipe, propEq } from 'ramda'
import { type FunctionComponent, useState } from 'react'

interface Props {
  listings: ListingWithRole[]
  selection?: Nullable<number>
  show?: boolean
}

export const ListingsPanel: FunctionComponent<Props> = ({ listings, selection, show }) => {
  const [listing, setListing] = useState<Nullable<ListingWithRole>>(
    isNil(selection) ? undefined : nth(selection, listings)
  )
  if (show) {
    return (
      <TabPanel className={clsx('outline-none')}>
        <ListingCards
          listings={listings}
          onSelect={(slug) => {
            pipe(find<ListingWithRole>(propEq(slug, 'slug')), setListing)(listings)
          }}
        />
        <ListingDetailsModal
          listing={listing}
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
