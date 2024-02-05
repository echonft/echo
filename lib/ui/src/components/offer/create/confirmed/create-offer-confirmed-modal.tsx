'use client'
import type { Offer } from '@echo/model/types/offer'
import { Modal } from '@echo/ui/components/base/modal/modal'
import { CreateOfferConfirmedModalBody } from '@echo/ui/components/offer/create/confirmed/create-offer-confirmed-modal-body'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { Nullable } from '@echo/utils/types/nullable'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

export interface CreateOfferConfirmedModalProps {
  offer: Nullable<Offer>
  open: boolean
  onClose?: EmptyFunction
}

export const CreateOfferConfirmedModal: FunctionComponent<CreateOfferConfirmedModalProps> = ({
  offer,
  open,
  onClose
}) => {
  const t = useTranslations('offer.create.confirmedModal')

  return (
    <Modal open={open} onClose={onClose} title={t('title')}>
      <CreateOfferConfirmedModalBody offer={offer} onClose={onClose} />
    </Modal>
  )
}
