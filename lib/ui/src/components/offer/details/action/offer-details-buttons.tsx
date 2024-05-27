'use client'
import {
  OFFER_STATE_ACCEPTED,
  OFFER_STATE_CANCELLED,
  OFFER_STATE_COMPLETED,
  OFFER_STATE_EXPIRED,
  OFFER_STATE_REJECTED
} from '@echo/model/constants/offer-states'
import { assertOfferStateTransition } from '@echo/model/helpers/offer/assert/assert-offer-state-transition'
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
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import { anyPass, isNil, or, partialRight } from 'ramda'
import { type FunctionComponent, useState } from 'react'

interface Props {
  offer: OfferWithRole
  onSuccess?: (offer: OfferWithRole) => unknown
  onError?: EmptyFunction
}

function showAcceptButton(offer: OfferWithRole) {
  try {
    assertOfferStateTransition(offer, OFFER_STATE_ACCEPTED)
    return isOfferRoleReceiver(offer)
  } catch (e) {
    return false
  }
}

function showCancelButton(offer: OfferWithRole) {
  try {
    assertOfferStateTransition(offer, OFFER_STATE_CANCELLED)
    return isOfferRoleSender(offer)
  } catch (e) {
    return false
  }
}

function showRejectButton(offer: OfferWithRole) {
  try {
    assertOfferStateTransition(offer, OFFER_STATE_REJECTED)
    return isOfferRoleReceiver(offer)
  } catch (e) {
    return false
  }
}

function showSwapButton(offer: OfferWithRole) {
  try {
    assertOfferStateTransition(offer, OFFER_STATE_COMPLETED)
    return isOfferRoleSender(offer)
  } catch (e) {
    return false
  }
}

function showRedeemButton(offer: OfferWithRole, areNftsInEscrow: boolean | undefined) {
  if (offer.state === OFFER_STATE_REJECTED || offer.state === OFFER_STATE_EXPIRED) {
    if (isNil(areNftsInEscrow)) {
      return false
    }
    return areNftsInEscrow
  }
  return false
}
function shouldShowButtons(offer: OfferWithRole, areNftsInEscrow: boolean | undefined) {
  return or(
    anyPass([showAcceptButton, showCancelButton, showRejectButton, showSwapButton]),
    partialRight(showRedeemButton, [areNftsInEscrow])
  )(offer)
}

export const OfferDetailsButtons: FunctionComponent<Props> = ({ offer, onSuccess }) => {
  const shouldCheckForEscrow = offer.state === OFFER_STATE_REJECTED || offer.state === OFFER_STATE_EXPIRED
  const nftsToCheckForEscrow = isOfferRoleReceiver(offer) ? offer.receiverItems : offer.senderItems
  const areNftsInEscrow = useAreNftsInEscrow(shouldCheckForEscrow ? nftsToCheckForEscrow : undefined)
  const [buttonsDisabled, setButtonsDisabled] = useState(false)
  const disable = () => setButtonsDisabled(true)
  const enable = () => setButtonsDisabled(false)
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
          show={showRedeemButton(offer, areNftsInEscrow)}
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
