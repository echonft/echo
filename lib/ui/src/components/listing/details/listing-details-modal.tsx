'use client'
import { Modal } from '@echo/ui/components/base/modal/modal'
import type { ListingDetailsProps } from '@echo/ui/components/listing/details/listing-details'
import { ListingDetailsModalBody } from '@echo/ui/components/listing/details/listing-details-modal-body'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

export interface ListingDetailsModalProps extends Omit<ListingDetailsProps, 'listing'> {
  listing: Nullable<ListingWithRole>
  onClose?: EmptyFunction
}

export const ListingDetailsModal: FunctionComponent<ListingDetailsModalProps> = ({ listing, onClose, onUpdate }) => {
  return (
    <Modal open={!isNil(listing)} onClose={onClose} backButton={{ onBack: onClose }}>
      <ListingDetailsModalBody listing={listing} onUpdate={onUpdate} />
    </Modal>
  )
}
