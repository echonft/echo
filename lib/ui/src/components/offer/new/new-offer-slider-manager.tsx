'use client'
import { removeItemFromNewOffer } from '../../../helpers/remove-item-from-new-offer'
import { newOfferDataState } from '../../../services/state'
import { BottomSlider } from '../../base/bottom-slider/bottom-slider'
import { BottomSliderTitle } from '../../base/bottom-slider/bottom-slider-title'
import { HideIfNil } from '../../base/hide-if-nil'
import { NewOfferBottomSliderInnerContainer } from './new-offer-bottom-slider-inner-container'
import { Transition } from '@headlessui/react'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { FunctionComponent } from 'react'
import { useRecoilState } from 'recoil'

// TODO Add finalize offer
export const NewOfferSliderManager: FunctionComponent = () => {
  const [newOffer, setNewOffer] = useRecoilState(newOfferDataState)
  const t = useTranslations('offer.new.bottomSlider')
  const onRemoveAsset = (itemNftId: string, isReceiver: boolean) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setNewOffer(removeItemFromNewOffer(itemNftId, isReceiver))
  }
  return (
    <Transition
      show={!isNil(newOffer)}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <HideIfNil
        checks={newOffer}
        render={(newOffer) => (
          <BottomSlider
            renderTitle={() => <BottomSliderTitle title={t('title')} count={newOffer.receiverItems.length} />}
          >
            {/* TODO Add action on add more */}
            <NewOfferBottomSliderInnerContainer
              receiver={newOffer.receiver}
              receiverItems={newOffer.receiverItems}
              senderItems={newOffer.senderItems}
              onRemoveReceiverItem={(itemNftId) => onRemoveAsset(itemNftId, true)}
              onRemoveSenderItem={(itemNftId) => onRemoveAsset(itemNftId, false)}
            />
          </BottomSlider>
        )}
      />
    </Transition>
  )
}
