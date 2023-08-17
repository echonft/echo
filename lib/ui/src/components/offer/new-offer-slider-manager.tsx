import { nftEquals } from '../../predicates/nft/nft-equals'
import { newOfferDataState, shouldOpenNewOfferSliderState } from '../../services/state'
import { Nft } from '../../types/nft'
import { BottomSlider } from '../base/bottom-slider'
import { HideIfNilOrEmpty } from '../utils/hide-if-nil-or-empty'
import { NewOfferBottomSliderInnerContainer } from './new-offer-bottom-slider-inner-container'
import { NewOfferBottomSliderTitle } from './new-offer-bottom-slider-title'
import { removeFromArray } from '@echo/utils'
import { FunctionComponent, useCallback } from 'react'
import { useRecoilState } from 'recoil'

// TODO Add finalize offer
export const NewOfferSliderManager: FunctionComponent = () => {
  const [newOffer, setNewOffer] = useRecoilState(newOfferDataState)
  const [defaultOpen] = useRecoilState(shouldOpenNewOfferSliderState)

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
    <HideIfNilOrEmpty checks={newOffer}>
      <BottomSlider
        defaultOpen={defaultOpen}
        renderTitle={() => <NewOfferBottomSliderTitle itemsSelected={newOffer?.receiverItems?.length || 0} />}
      >
        {/* TODO Add action on add more */}
        <NewOfferBottomSliderInnerContainer
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
