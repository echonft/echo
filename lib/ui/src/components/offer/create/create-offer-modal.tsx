'use client'
import { type OfferItem } from '@echo/model/types/offer-item'
import type { User } from '@echo/model/types/user'
import { Modal } from '@echo/ui/components/base/modal/modal'
import { CreateOfferModalBody } from '@echo/ui/components/offer/create/create-offer-modal-body'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

export interface NewOfferConfirmationModalProps {
  open: boolean
  receiver: User
  receiverItems: OfferItem[]
  senderItems?: OfferItem[]
  loading?: boolean
  onClear?: VoidFunction
  onContinue?: VoidFunction
  onComplete?: VoidFunction
  onClose?: VoidFunction
}

export const CreateOfferModal: FunctionComponent<NewOfferConfirmationModalProps> = ({
  open,
  loading,
  onClose,
  ...rest
}) => {
  const t = useTranslations('offer.create')
  const closeCallback = loading ? undefined : onClose
  return (
    <Modal
      open={open}
      onClose={closeCallback}
      backButton={{
        label: t('backBtn'),
        onBack: closeCallback
      }}
    >
      <CreateOfferModalBody loading={loading} {...rest} />
    </Modal>
  )
}
