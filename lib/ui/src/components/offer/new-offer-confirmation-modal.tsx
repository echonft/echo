import { newOfferDataState, newOfferState, shouldOpenNewOfferSliderState } from '../../services/state'
import { Modal } from '../base/modal'
import { NewOfferConfirmationModalInnerContainer } from './new-offer-confirmation-modal-inner-container'
import { NewOfferConfirmedModalInnerContainer } from './new-offer-confirmed-modal-inner-container'
import { NewOfferModalTitle } from './new-offer-modal-title'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { FunctionComponent, useCallback } from 'react'
import { useRecoilState } from 'recoil'

export const NewOfferConfirmationModal: FunctionComponent = () => {
  const t = useTranslations('offer.new')
  const [newOffer, setNewOffer] = useRecoilState(newOfferDataState)
  const [modalState, setModalState] = useRecoilState(newOfferState)
  const [, setShouldOpenNewOfferSlider] = useRecoilState(shouldOpenNewOfferSliderState)

  // We check state and data because when we close the modal we reset the state but then data will be undefined
  const isConfirmed = useCallback(() => modalState === 'CONFIRMED' || isNil(newOffer), [modalState, newOffer])

  return (
    <Modal
      open={modalState !== 'NONE'}
      onClose={() => setModalState('NONE')}
      renderTitle={() => (
        <NewOfferModalTitle title={t(`${isConfirmed() ? 'confirmedModal' : 'confirmationModal'}.title`)} />
      )}
      renderDescription={() =>
        isConfirmed() ? (
          <NewOfferConfirmedModalInnerContainer onConfirm={() => setModalState('NONE')} />
        ) : (
          <NewOfferConfirmationModalInnerContainer
            senderAssets={newOffer?.senderItems ?? []}
            receiverAssets={newOffer?.receiverItems ?? []}
            onConfirm={() => {
              // TODO Add call to API to create offer
              setModalState('CONFIRMED')
              setNewOffer(undefined)
            }}
            onEdit={() => {
              setShouldOpenNewOfferSlider(true)
              setModalState('NONE')
            }}
          />
        )
      }
    />
  )
}
