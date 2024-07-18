'use client'
import type { Offer } from '@echo/model/types/offer'
import { Modal } from '@echo/ui/components/base/modal/modal'
import { ListingDetailsModalBody } from '@echo/ui/components/listing/details/listing-details-modal-body'
import { getListingBackground } from '@echo/ui/helpers/listing/get-listing-background'
import { useBackground } from '@echo/ui/hooks/use-background'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

export interface ListingDetailsModalProps {
  listing: Nullable<ListingWithRole>
  offers: Offer[]
  onClose?: EmptyFunction
  onUpdate?: (listing: ListingWithRole) => unknown
}

export const ListingDetailsModal: FunctionComponent<ListingDetailsModalProps> = ({
  listing,
  offers,
  onClose,
  onUpdate
}) => {
  const { className } = useBackground(getListingBackground(listing))
  return (
    <Modal open={!isNil(listing)} onClose={onClose} className={className} backButton={{ onBack: onClose }}>
      <ListingDetailsModalBody listing={listing} offers={offers} onUpdate={onUpdate} />
    </Modal>
  )
}
