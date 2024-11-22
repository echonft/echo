'use client'
import { ListingDetails } from '@echo/ui/components/listing/details/listing-details'
import type { ListingDetailsModalProps } from '@echo/ui/components/listing/details/listing-details-modal'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

export const ListingDetailsModalBody: FunctionComponent<Omit<ListingDetailsModalProps, 'onClose'>> = ({
  listing,
  onUpdate
}) => {
  if (isNil(listing)) {
    return null
  }
  return (
    <div className={clsx('w-[66vw]', 'h-max', 'max-w-[70rem]')}>
      <ListingDetails listing={listing} onUpdate={onUpdate} />
    </div>
  )
}
