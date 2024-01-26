'use client'
import type { Listing } from '@echo/model/types/listing'
import { Modal } from '@echo/ui/components/base/modal/modal'
import { NewListingConfirmedModalBody } from '@echo/ui/components/listing/new/new-listing-confirmed-modal-body'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

interface Props {
  listing: Listing | undefined
  open: boolean
  onClose?: EmptyFunction
}

export const NewListingConfirmedModal: FunctionComponent<Props> = ({ listing, open, onClose }) => {
  const t = useTranslations('listing.new.confirmedModal')

  return (
    <Modal open={open} onClose={onClose} title={t('title')}>
      <NewListingConfirmedModalBody listing={listing} onClose={onClose} />
    </Modal>
  )
}
