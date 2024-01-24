'use client'
import type { AuthUser } from '@echo/model/types/auth-user'
import type { Listing } from '@echo/model/types/listing'
import { Modal } from '@echo/ui/components/base/modal/modal'
import { ListingDetailsModalBody } from '@echo/ui/components/listing/details/modal/listing-details-modal-body'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

export interface ListingDetailsModalProps {
  open: boolean
  listing: Listing | undefined
  hasOffers?: boolean
  user: AuthUser | undefined
  actions?: {
    onCancel?: (listing: Listing) => unknown
    onClose?: VoidFunction
    onFill?: VoidFunction
    onViewOffers?: VoidFunction
  }
}

export const ListingDetailsModal: FunctionComponent<ListingDetailsModalProps> = ({
  open,
  listing,
  hasOffers,
  user,
  actions
}) => {
  const t = useTranslations('listing.details.modal')
  return (
    <Modal
      open={open}
      title={t('title')}
      backButton={{
        label: t('backBtn'),
        onBack: actions?.onClose
      }}
      onClose={actions?.onClose}
    >
      <ListingDetailsModalBody listing={listing} user={user} hasOffers={hasOffers} actions={actions} />
    </Modal>
  )
}
