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
import { OfferDetailsButtonsLayout } from '@echo/ui/components/offer/details/layout/offer-details-buttons-layout'
import { isOfferRoleReceiver } from '@echo/ui/helpers/offer/is-offer-role-receiver'
import { isOfferRoleSender } from '@echo/ui/helpers/offer/is-offer-role-sender'
import { useAreNftsInEscrow } from '@echo/ui/hooks/use-are-nfts-in-escrow'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { nonEmptyMap } from '@echo/utils/helpers/non-empty-map'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import { anyPass, assoc, isNil, pipe } from 'ramda'
import { useState, type FunctionComponent } from 'react'

interface Props {
  offer: OfferWithRole
  onSuccess?: (offer: OfferWithRole) => unknown
  onError?: EmptyFunction
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
function shouldShowButtons(offer: OfferWithRole, areNftsInEscrow: boolean | undefined) {
  // FIXME could be cleaner
  return (
    anyPass([showAcceptButton, showCancelButton, showRejectButton, showSwapButton])(offer) ||
    showRedeemButton(areNftsInEscrow)
  )
}

// TODO Need to add ERC20 escrow check
export const OfferDetailsButtons: FunctionComponent<Props> = ({ offer, onSuccess }) => {
  const shouldCheckForEscrow = offer.state === OfferState.Rejected || offer.state === OfferState.Expired
  const nftsToCheckForEscrow = isOfferRoleReceiver(offer)
    ? pipe(offerReceiverNftItems, nonEmptyMap(pipe(nftItemToNft(offer.sender), assoc('attributes', []))))(offer)
    : pipe(offerSenderNftItems, nonEmptyMap(pipe(nftItemToNft(offer.sender), assoc('attributes', []))))(offer)
  const areNftsInEscrow = useAreNftsInEscrow(shouldCheckForEscrow ? nftsToCheckForEscrow : undefined)
  const [buttonsDisabled, setButtonsDisabled] = useState(false)

  const disable = () => {
    setButtonsDisabled(true)
  }

  const enable = () => {
    setButtonsDisabled(false)
  }
  const success = (offer: OfferWithRole) => {
    setButtonsDisabled(false)
    onSuccess?.(offer)
  }
  const error = () => {
    setButtonsDisabled(false)
  }
  // Don't show anything if no buttons should be shown
  if (shouldShowButtons(offer, areNftsInEscrow)) {
    return (
      <OfferDetailsButtonsLayout>
        <OfferDetailsAcceptButton
          offer={offer}
          show={showAcceptButton(offer)}
          onClick={disable}
          onSuccess={success}
          onCancel={enable}
          disabled={buttonsDisabled}
        />
        <OfferDetailsSwapButton
          offer={offer}
          show={showSwapButton(offer)}
          onClick={disable}
          onSuccess={success}
          onCancel={enable}
          disabled={buttonsDisabled}
        />
        <OfferDetailsRejectButton
          offer={offer}
          show={showRejectButton(offer)}
          onClick={disable}
          onSuccess={success}
          onError={error}
          disabled={buttonsDisabled}
        />
        <OfferDetailsCancelButton
          offer={offer}
          show={showCancelButton(offer)}
          onClick={disable}
          onSuccess={success}
          onError={error}
          disabled={buttonsDisabled}
        />
        <OfferDetailsRedeemButton
          offer={offer}
          show={showRedeemButton(areNftsInEscrow)}
          onClick={disable}
          onSuccess={success}
          onError={error}
          disabled={buttonsDisabled}
        />
      </OfferDetailsButtonsLayout>
    )
  }
  return null
}
