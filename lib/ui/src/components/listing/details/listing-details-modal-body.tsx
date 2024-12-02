'use client'
import { DetailsModalBodyLayout } from '@echo/ui/components/base/layout/details-modal-body-layout'
import { ListingDetails } from '@echo/ui/components/listing/details/listing-details'
import type { ListingDetailsModalProps } from '@echo/ui/components/listing/details/listing-details-modal'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

export const ListingDetailsModalBody: FunctionComponent<ListingDetailsModalProps> = ({
  listing,
  onUpdate,
  onClose
}) => {
  if (isNil(listing)) {
    return null
  }
  return (
    <DetailsModalBodyLayout>
      <ListingDetails listing={listing} onUpdate={onUpdate} onClose={onClose} />
    </DetailsModalBodyLayout>
  )
}
