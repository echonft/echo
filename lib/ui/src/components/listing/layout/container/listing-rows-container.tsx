'use client'
import type { AuthUser } from '@echo/model/types/auth-user'
import { type Listing } from '@echo/model/types/listing'
import { ListingDetailsModal } from '@echo/ui/components/listing/details/modal/listing-details-modal'
import { ListingRowsLayout } from '@echo/ui/components/listing/layout/listing-rows-layout'
import { ListingRow } from '@echo/ui/components/listing/row/listing-row'
import { isNil, map } from 'ramda'
import { type FunctionComponent, useEffect, useRef, useState } from 'react'

interface Props {
  listings: Listing[]
  hasOffers?: boolean
  user: AuthUser | undefined
}

// TODO Not sure if the logic should be here, I think we should have a separate component
export const ListingRowsContainer: FunctionComponent<Props> = ({ listings, hasOffers, user }) => {
  const [detailsModalOpen, setDetailsModalOpen] = useState<boolean>(false)
  const [selectedListing, setSelectedListing] = useState<Listing>()
  const closeModalTimeoutRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    return (): void => {
      if (!isNil(closeModalTimeoutRef.current)) {
        clearTimeout(closeModalTimeoutRef.current)
      }
    }
  }, [])

  function closeModal() {
    setDetailsModalOpen(false)
    closeModalTimeoutRef.current = setTimeout(() => setSelectedListing(undefined), 210)
  }
  return (
    <>
      <ListingRowsLayout>
        {map(
          (listing) => (
            <ListingRow
              key={listing.id}
              listing={listing}
              onViewDetailsClick={(listing) => {
                setSelectedListing(listing)
                setDetailsModalOpen(true)
              }}
            />
          ),
          listings
        )}
      </ListingRowsLayout>
      <ListingDetailsModal
        open={detailsModalOpen}
        listing={selectedListing}
        user={user}
        hasOffers={hasOffers}
        onClose={closeModal}
      />
    </>
  )
}
