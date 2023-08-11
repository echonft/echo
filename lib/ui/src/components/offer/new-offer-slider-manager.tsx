import { newOfferState } from '../../services/state'
import { BottomSlider } from '../base/bottom-slider/bottom-slider'
import { HideIfNilOrEmpty } from '../utils/hide-if-nil-or-empty'
import { OfferBottomSliderInnerContainer } from './offer-bottom-slider-inner-container'
import { OfferBottomSliderTitle } from './offer-bottom-slider-title'
import { FunctionComponent } from 'react'
import { useRecoilState } from 'recoil'

export const NewOfferSliderManager: FunctionComponent = () => {
  const [newOffer] = useRecoilState(newOfferState)

  return (
    <HideIfNilOrEmpty checks={newOffer?.receiverItems}>
      <BottomSlider renderTitle={() => <OfferBottomSliderTitle itemsSelected={newOffer?.receiverItems?.length || 0} />}>
        <OfferBottomSliderInnerContainer
          counterparty={newOffer?.receiver}
          counterpartyAssets={newOffer?.receiverItems}
          ownerAssets={newOffer?.senderItems}
        />
      </BottomSlider>
    </HideIfNilOrEmpty>
  )
}
