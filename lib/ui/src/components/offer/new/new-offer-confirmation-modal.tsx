'use client'
import { type OfferItem } from '@echo/model/types/offer-item'
import type { User } from '@echo/model/types/user'
import { Modal } from '@echo/ui/components/base/modal/modal'
import { NewOfferConfirmationModalBody } from '@echo/ui/components/offer/new/new-offer-confirmation-modal-body'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

export interface NewOfferConfirmationModalProps {
  receiver: User
  receiverItems: OfferItem[]
  senderItems?: OfferItem[]
  open: boolean
  onClear?: VoidFunction
  onContinue?: VoidFunction
  onComplete?: VoidFunction
  onClose?: VoidFunction
}

export const NewOfferConfirmationModal: FunctionComponent<NewOfferConfirmationModalProps> = ({
  open,
  onClose,
  ...rest
}) => {
  const t = useTranslations('offer.new.confirmationModal')
  return (
    <Modal
      open={open}
      onClose={onClose}
      backButton={{
        label: t('backBtn'),
        onBack: onClose
      }}
    >
      <NewOfferConfirmationModalBody {...rest} />
    </Modal>
  )
}
