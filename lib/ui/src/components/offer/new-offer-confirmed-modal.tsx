import { newOfferDataState, newOfferState, shouldOpenNewOfferSliderState } from '../../services/state'
import { Modal } from '../base/modal'
import { NewOfferConfirmationModalInnerContainer } from './new-offer-confirmation-modal-inner-container'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'
import { useRecoilState } from 'recoil'

export const NewOfferConfirmatedModal: FunctionComponent = () => {
  const t = useTranslations('offer.new.confirmationModal')
  const [newOffer] = useRecoilState(newOfferDataState)
  const [state, setState] = useRecoilState(newOfferState)
  const [, setShouldOpenNewOfferSlider] = useRecoilState(shouldOpenNewOfferSliderState)
  return (
    <Modal
      open={state === 'TO CONFIRM'}
      onClose={() => setState('NONE')}
      renderTitle={() => (
        <span className={clsx('text-white', 'text-center', 'prose-header-sm-semi')}>{t('title')}</span>
      )}
      renderDescription={() => (
        <NewOfferConfirmationModalInnerContainer
          senderAssets={newOffer.senderItems}
          receiverAssets={newOffer.receiverItems}
          onConfirm={() => setState('CONFIRMED')}
          onEdit={() => {
            setShouldOpenNewOfferSlider(true)
            setState('NONE')
          }}
        />
      )}
    />
  )
}
