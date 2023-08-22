import { nftEquals } from '../../predicates/nft/nft-equals'
import { newOfferDataState } from '../../services/state'
import { Nft } from '../../types/nft'
import { BottomSlider } from '../base/bottom-slider'
import { HideIfNil } from '../utils/hide-if-nil'
import { NewOfferBottomSliderInnerContainer } from './new-offer-bottom-slider-inner-container'
import { NewOfferBottomSliderTitle } from './new-offer-bottom-slider-title'
import { removeFromArray } from '@echo/utils'
import { FunctionComponent, useCallback } from 'react'
import { useRecoilState } from 'recoil'

// TODO Add finalize offer
export const NewOfferSliderManager: FunctionComponent = () => {
  const [newOffer, setNewOffer] = useRecoilState(newOfferDataState)

  const onRemoveAsset = useCallback(
    (nftToRemove: Nft, isReceiver: boolean) => {
      setNewOffer(
        (currVal) =>
          currVal && {
            receiver: currVal.receiver,
            receiverItems: isReceiver
              ? removeFromArray(currVal.receiverItems, nftToRemove, nftEquals)
              : currVal?.receiverItems,
            senderItems: !isReceiver
              ? removeFromArray(currVal.senderItems, nftToRemove, nftEquals)
              : currVal?.senderItems
          }
      )
    },
    [setNewOffer]
  )
  return (
    <HideIfNil
      checks={newOffer}
      render={() => (
        <BottomSlider renderTitle={() => <NewOfferBottomSliderTitle itemsSelected={newOffer!.receiverItems.length} />}>
          {/* TODO Add action on add more */}
          <NewOfferBottomSliderInnerContainer
            receiver={newOffer!.receiver}
            receiverAssets={newOffer!.receiverItems}
            senderAssets={newOffer!.senderItems}
            onRemoveReceiverAsset={(nftToRemove) => onRemoveAsset(nftToRemove, true)}
            onRemoveSenderAsset={(nftToRemove) => onRemoveAsset(nftToRemove, false)}
          />
        </BottomSlider>
      )}
    ></HideIfNil>
  )
}
