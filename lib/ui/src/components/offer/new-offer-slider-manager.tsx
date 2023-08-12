import { newOfferState } from '../../services/state'
import { BottomSlider } from '../base/bottom-slider'
import { HideIfNilOrEmpty } from '../utils/hide-if-nil-or-empty'
import { OfferBottomSliderInnerContainer } from './offer-bottom-slider-inner-container'
import { OfferBottomSliderTitle } from './offer-bottom-slider-title'
import { Nft, nftEquals } from '@echo/model'
import { removeFromArray } from '@echo/utils'
import { FunctionComponent, useCallback } from 'react'
import { useRecoilState } from 'recoil'

// TODO Add more action
// TODO Add finalize offer
export const NewOfferSliderManager: FunctionComponent = () => {
  const [newOffer, setNewOffer] = useRecoilState(newOfferState)

  const onRemoveAsset = useCallback(
    (nftToRemove: Nft, isReceiver: boolean) => {
      setNewOffer((currVal) => ({
        receiver: currVal.receiver,
        receiverItems: isReceiver
          ? removeFromArray(currVal.receiverItems, nftToRemove, nftEquals)
          : currVal.receiverItems,
        senderItems: !isReceiver ? removeFromArray(currVal.senderItems, nftToRemove, nftEquals) : currVal.senderItems
      }))
    },
    [setNewOffer]
  )

  return (
    <HideIfNilOrEmpty checks={newOffer?.receiverItems}>
      <BottomSlider renderTitle={() => <OfferBottomSliderTitle itemsSelected={newOffer?.receiverItems?.length || 0} />}>
        <OfferBottomSliderInnerContainer
          receiver={newOffer?.receiver}
          receiverAssets={newOffer?.receiverItems}
          senderAssets={newOffer?.senderItems}
          onRemoveReceiverAsset={(nftToRemove) => onRemoveAsset(nftToRemove, true)}
          onRemoveSenderAsset={(nftToRemove) => onRemoveAsset(nftToRemove, false)}
        />
      </BottomSlider>
    </HideIfNilOrEmpty>
  )
}
