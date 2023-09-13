'use client'
import { Modal } from '@echo/ui/components/layout/modal/modal'
import { ModalTitle } from '@echo/ui/components/layout/modal/modal-title'
import { NewOfferConfirmationModalInnerContainer } from '@echo/ui/components/offer/new/new-offer-confirmation-modal-inner-container'
import { NewOfferConfirmedModalInnerContainer } from '@echo/ui/components/offer/new/new-offer-confirmed-modal-inner-container'
import { newOfferDataState, newOfferState } from '@echo/ui/services/state'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { type FunctionComponent, useCallback } from 'react'
import { useRecoilState } from 'recoil'

interface Props {
  newOffer: NewOffer | undefined
  onClose?: () => unknown
}

export const NewOfferConfirmationModal: FunctionComponent<Props> = ({ newOffer, onClose }) => {
  const t = useTranslations('offer.new')
  const { clearOffer } = useNewOfferStore()
  const [transactionId, setTransactionId] = useState<string | undefined>()

  function isConfirmed() {
    return !isNil(transactionId)
  }

  return (
    <Modal
      open={!isNil(newOffer) || !isNil(transactionId)}
      onClose={() => onClose?.()}
      renderTitle={() => (
        <ModalTitle>{t(`${isConfirmed() ? 'confirmedModal' : 'confirmationModal'}.title`)}</ModalTitle>
      )}
      renderDescription={() =>
        isConfirmed() ? (
          // TODO I dont think it's transaction id here
          <NewOfferConfirmedModalInnerContainer
            onConfirm={() => {
              setTransactionId(undefined)
              onClose?.()
            }}
            transactionId={transactionId!}
          />
        ) : (
          <NewOfferConfirmationModalInnerContainer
            senderItems={newOffer!.senderItems}
            receiverItems={newOffer!.receiverItems}
            onConfirm={() => {
              // TODO Add call to API to create offer
              setTransactionId('TEST')
              clearOffer()
            }}
            onEdit={onClose}
          />
        )
      }
    />
  )
}
