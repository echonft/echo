'use client'
import {
  OFFER_STATE_ACCEPTED,
  OFFER_STATE_CANCELLED,
  OFFER_STATE_COMPLETED,
  OFFER_STATE_REJECTED
} from '@echo/model/constants/offer-states'
import { assertOfferStateTransition } from '@echo/model/helpers/offer/assert/assert-offer-state-transition'
import { ShowIf } from '@echo/ui/components/base/utils/show-if'
import { OfferDetailsAcceptButton } from '@echo/ui/components/offer/details/action/offer-details-accept-button'
import { OfferDetailsCancelButton } from '@echo/ui/components/offer/details/action/offer-details-cancel-button'
import { OfferDetailsRejectButton } from '@echo/ui/components/offer/details/action/offer-details-reject-button'
import { OfferDetailsSwapButton } from '@echo/ui/components/offer/details/action/offer-details-swap-button'
import { OfferDetailsButtonsLayout } from '@echo/ui/components/offer/details/layout/offer-details-buttons-layout'
import { isOfferRoleReceiver } from '@echo/ui/helpers/offer/is-offer-role-receiver'
import { isOfferRoleSender } from '@echo/ui/helpers/offer/is-offer-role-sender'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import { anyPass, either, propEq } from 'ramda'
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
    return either(propEq(OFFER_STATE_ACCEPTED, 'state') as (offer: OfferWithRole) => boolean, isOfferRoleSender)(offer)
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
function shouldShowButtons(offer: OfferWithRole) {
  return anyPass([showAcceptButton, showCancelButton, showRejectButton, showSwapButton])(offer)
}

export const OfferDetailsButtons: FunctionComponent<Props> = ({ offer, onSuccess }) => {
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
  if (!shouldShowButtons(offer)) {
    return null
  }

  return (
    <OfferDetailsButtonsLayout>
      <ShowIf condition={showAcceptButton(offer)}>
        <OfferDetailsAcceptButton
          offer={offer}
          onClick={disable}
          onSuccess={success}
          onCancel={enable}
          disabled={buttonsDisabled}
        />
      </ShowIf>
      <ShowIf condition={showSwapButton(offer)}>
        <OfferDetailsSwapButton
          offer={offer}
          onClick={disable}
          onSuccess={success}
          onCancel={enable}
          disabled={buttonsDisabled}
        />
      </ShowIf>
      <ShowIf condition={showRejectButton(offer)}>
        <OfferDetailsRejectButton
          offer={offer}
          onClick={disable}
          onSuccess={success}
          onError={error}
          disabled={buttonsDisabled}
        />
      </ShowIf>
      <ShowIf condition={showCancelButton(offer)}>
        <OfferDetailsCancelButton
          offer={offer}
          onClick={disable}
          onSuccess={success}
          onError={error}
          disabled={buttonsDisabled}
        />
      </ShowIf>
    </OfferDetailsButtonsLayout>
  )
}
