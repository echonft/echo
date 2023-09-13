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

export const NewOfferConfirmationModal: FunctionComponent = () => {
  const t = useTranslations('offer.new')
  const [newOffer, setNewOffer] = useRecoilState(newOfferDataState)
  const [modalState, setModalState] = useRecoilState(newOfferState)

  // We check state and data because when we close the modal we reset the state but then data will be undefined
  const isConfirmed = useCallback(() => modalState === 'CONFIRMED' || isNil(newOffer), [modalState, newOffer])

  return (
    <Modal
      open={modalState !== 'NONE'}
      onClose={() => setModalState('NONE')}
      renderTitle={() => (
        <ModalTitle>{t(`${isConfirmed() ? 'confirmedModal' : 'confirmationModal'}.title`)}</ModalTitle>
      )}
      renderDescription={() =>
        isConfirmed() ? (
          // TODO Add transaction ID here
          <NewOfferConfirmedModalInnerContainer onConfirm={() => setModalState('NONE')} transactionId={'TODO'} />
        ) : (
          <NewOfferConfirmationModalInnerContainer
            senderItems={newOffer?.senderItems ?? []}
            receiverItems={newOffer?.receiverItems ?? []}
            onConfirm={() => {
              // TODO Add call to API to create offer
              setModalState('CONFIRMED')
              setNewOffer(undefined)
            }}
            onEdit={() => {
              // TODO Should reopen the drawer?
              setModalState('NONE')
            }}
          />
        )
      }
    />
  )
}
