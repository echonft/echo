'use client'
import { OfferState } from '@echo/model/constants/offer-state'
import { offerReceiverNftItems } from '@echo/model/helpers/offer/offer-receiver-nft-items'
import { offerSenderNftItems } from '@echo/model/helpers/offer/offer-sender-nft-items'
import { nftItemToNft } from '@echo/model/mappers/item/nft-item-to-nft'
import { OfferDetailsAcceptButton } from '@echo/ui/components/offer/details/action/offer-details-accept-button'
import { OfferDetailsCancelButton } from '@echo/ui/components/offer/details/action/offer-details-cancel-button'
import { OfferDetailsRedeemButton } from '@echo/ui/components/offer/details/action/offer-details-redeem-button'
import { OfferDetailsRejectButton } from '@echo/ui/components/offer/details/action/offer-details-reject-button'
import { OfferDetailsSwapButton } from '@echo/ui/components/offer/details/action/offer-details-swap-button'
import { isOfferRoleReceiver } from '@echo/ui/helpers/offer/is-offer-role-receiver'
import { isOfferRoleSender } from '@echo/ui/helpers/offer/is-offer-role-sender'
import { useAreNftsInEscrow } from '@echo/ui/hooks/use-are-nfts-in-escrow'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { nonEmptyMap } from '@echo/utils/helpers/non-empty-map'
import { assoc, isNil, pipe } from 'ramda'
import { type FunctionComponent } from 'react'

export interface OfferDetailsButtonsProps {
  offer: OfferWithRole
  loading?: boolean
  onError?: VoidFunction
  onLoading?: VoidFunction
  onRedeem?: (offer: OfferWithRole) => void
  onSwap?: VoidFunction
  onUpdate?: (offer: OfferWithRole) => void
}

function showAcceptButton(offer: OfferWithRole) {
  return isOfferRoleReceiver(offer) && offer.state === OfferState.Open
}

function showCancelButton(offer: OfferWithRole) {
  return isOfferRoleSender(offer) && offer.state === OfferState.Open
}

function showRejectButton(offer: OfferWithRole) {
  return isOfferRoleReceiver(offer) && offer.state === OfferState.Open
}

function showSwapButton(offer: OfferWithRole) {
  return isOfferRoleSender(offer) && offer.state === OfferState.Accepted
}

// TODO ERC20 escrow check
function showRedeemButton(areNftsInEscrow: boolean | undefined) {
  if (isNil(areNftsInEscrow)) {
    return false
  }
  return areNftsInEscrow
}

// TODO Need to add ERC20 escrow check
export const OfferDetailsButtons: FunctionComponent<OfferDetailsButtonsProps> = ({
  offer,
  loading,
  onError,
  onLoading,
  onSwap,
  onRedeem,
  onUpdate
}) => {
  const shouldCheckForEscrow = offer.state === OfferState.Rejected || offer.state === OfferState.Expired
  const nftsToCheckForEscrow = isOfferRoleReceiver(offer)
    ? pipe(offerReceiverNftItems, nonEmptyMap(pipe(nftItemToNft(offer.receiver), assoc('attributes', []))))(offer)
    : pipe(offerSenderNftItems, nonEmptyMap(pipe(nftItemToNft(offer.sender), assoc('attributes', []))))(offer)
  const areNftsInEscrow = useAreNftsInEscrow(shouldCheckForEscrow ? nftsToCheckForEscrow : undefined)

  return (
    <>
      <OfferDetailsAcceptButton
        offer={offer}
        show={showAcceptButton(offer)}
        onClick={onLoading}
        onError={onError}
        onSuccess={onUpdate}
        disabled={loading}
      />
      <OfferDetailsSwapButton
        offer={offer}
        show={showSwapButton(offer)}
        onClick={onLoading}
        onSuccess={onSwap}
        onError={onError}
        disabled={loading}
      />
      <OfferDetailsRejectButton
        offer={offer}
        show={showRejectButton(offer)}
        onClick={onLoading}
        onSuccess={onUpdate}
        onError={onError}
        disabled={loading}
      />
      <OfferDetailsCancelButton
        offer={offer}
        show={showCancelButton(offer)}
        onClick={onLoading}
        onSuccess={onUpdate}
        onError={onError}
        disabled={loading}
      />
      <OfferDetailsRedeemButton
        offer={offer}
        show={showRedeemButton(areNftsInEscrow)}
        onClick={onLoading}
        onSuccess={onRedeem}
        onError={onError}
        disabled={loading}
      />
    </>
  )
}
