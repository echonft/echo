'use client'
import { removeItemFromNewOffer } from '../../../helpers/remove-item-from-new-offer'
import { newOfferDataState } from '../../../services/state'
import { BottomSlider } from '../../base/bottom-slider/bottom-slider'
import { BottomSliderTitle } from '../../base/bottom-slider/bottom-slider-title'
import { HideIfNil } from '../../base/hide-if-nil'
import { NewOfferBottomSliderInnerContainer } from './new-offer-bottom-slider-inner-container'
import { OfferItem } from '@echo/ui-model'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'
import { useRecoilState } from 'recoil'

// TODO Add finalize offer
export const NewOfferSliderManager: FunctionComponent = () => {
  const [newOffer, setNewOffer] = useRecoilState(newOfferDataState)
  const t = useTranslations('offer.new.bottomSlider')
  const onRemoveAsset = (itemToRemove: OfferItem, isReceiver: boolean) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setNewOffer(removeItemFromNewOffer(itemToRemove, isReceiver))
  }
  return (
    <HideIfNil
      checks={newOffer}
      render={() => (
        <BottomSlider
          renderTitle={() => <BottomSliderTitle title={t('title')} count={newOffer?.receiverItems.length} />}
        >
          {/* TODO Add action on add more */}
          <NewOfferBottomSliderInnerContainer
            receiver={newOffer!.receiver}
            receiverItems={newOffer!.receiverItems}
            senderItems={newOffer!.senderItems}
            onRemoveReceiverItem={(itemToRemove) => onRemoveAsset(itemToRemove, true)}
            onRemoveSenderItem={(itemToRemove) => onRemoveAsset(itemToRemove, false)}
          />
        </BottomSlider>
      )}
    ></HideIfNil>
  )
}
