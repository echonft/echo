'use client'
import { Modal } from '@echo/ui/components/layout/modal/modal'
import { ModalTitle } from '@echo/ui/components/layout/modal/modal-title'
import { NewOfferConfirmationModalInnerContainer } from '@echo/ui/components/offer/new/new-offer-confirmation-modal-inner-container'
import { NewOfferConfirmedModalInnerContainer } from '@echo/ui/components/offer/new/new-offer-confirmed-modal-inner-container'
import { useNewOfferStore } from '@echo/ui/hooks/use-new-offer-store'
import { NewOffer } from '@echo/ui/types/model/new-offer'
import { Offer } from '@echo/ui/types/model/offer'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  newOffer: NewOffer | undefined
  offer: Offer | undefined
  onConfirm?: () => unknown
  onClose?: () => unknown
}

export const NewOfferConfirmationModal: FunctionComponent<Props> = ({ newOffer, offer, onConfirm, onClose }) => {
  const t = useTranslations('offer.new')
  const { clearOffer } = useNewOfferStore()

  function isConfirmed() {
    return !isNil(offer?.swapTransactionId)
  }

  return (
    <Modal
      open={!isNil(newOffer) || !isNil(offer)}
      onClose={() => onClose?.()}
      renderTitle={() => (
        <ModalTitle>{t(`${isConfirmed() ? 'confirmedModal' : 'confirmationModal'}.title`)}</ModalTitle>
      )}
      renderDescription={() =>
        isConfirmed() ? (
          // TODO I dont think it's transaction id here
          <NewOfferConfirmedModalInnerContainer
            onConfirm={() => {
              onClose?.()
            }}
            transactionId={offer!.swapTransactionId!}
          />
        ) : (
          <NewOfferConfirmationModalInnerContainer
            senderItems={newOffer?.senderItems ?? []}
            receiverItems={newOffer?.receiverItems ?? []}
            onConfirm={() => {
              onConfirm?.()
              clearOffer()
            }}
            onEdit={onClose}
          />
        )
      }
    />
  )
}
