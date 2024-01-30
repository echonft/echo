'use client'
import type { AcceptOfferArgs } from '@echo/api/types/fetchers/accept-offer-args'
import type { CancelOfferArgs } from '@echo/api/types/fetchers/cancel-offer-args'
import type { GetOfferSignatureArgs } from '@echo/api/types/fetchers/get-offer-signature-args'
import type { RejectOfferArgs } from '@echo/api/types/fetchers/reject-offer-args'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import type { OfferSignatureResponse } from '@echo/api/types/responses/offer-signature-response'
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
import type { Fetcher } from '@echo/utils/types/fetcher'
import type { HexString } from '@echo/utils/types/hex-string'
import type { ApproveErc721ContractArgs } from '@echo/web3/types/approve-erc-721-contract-args'
import type { ChainProvider } from '@echo/web3/types/chain-provider'
import type { ExecuteSwapArgs } from '@echo/web3/types/execute-swap-args'
import type { GetErc721ContractApprovalArgs } from '@echo/web3/types/get-erc-721-contract-approval-args'
import type { SignOfferArgs } from '@echo/web3/types/sign-offer-args'
import { anyPass, either, propEq } from 'ramda'
import { type FunctionComponent, useState } from 'react'

interface Props {
  offer: OfferWithRole
  fetcher: {
    approveErc721Contract: Fetcher<HexString, ApproveErc721ContractArgs>
    getErc721ContractApproval: Fetcher<boolean, GetErc721ContractApprovalArgs>
    acceptOffer: Fetcher<OfferResponse, AcceptOfferArgs>
    cancelOffer: Fetcher<OfferResponse, CancelOfferArgs>
    executeSwap: Fetcher<HexString, ExecuteSwapArgs>
    getOfferSignature: Fetcher<OfferSignatureResponse, GetOfferSignatureArgs>
    rejectOffer: Fetcher<OfferResponse, RejectOfferArgs>
    signOffer: Fetcher<HexString, SignOfferArgs>
  }
  provider: {
    chain: ChainProvider
  }
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

export const OfferDetailsButtons: FunctionComponent<Props> = ({ offer, fetcher, provider, onSuccess }) => {
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
          fetcher={fetcher}
          provider={provider}
          onClick={disable}
          onSuccess={success}
          onCancel={enable}
          disabled={buttonsDisabled}
        />
      </ShowIf>
      <ShowIf condition={showSwapButton(offer)}>
        <OfferDetailsSwapButton
          offer={offer}
          fetcher={fetcher}
          provider={provider}
          onClick={disable}
          onSuccess={success}
          onCancel={enable}
          disabled={buttonsDisabled}
        />
      </ShowIf>
      <ShowIf condition={showRejectButton(offer)}>
        <OfferDetailsRejectButton
          offer={offer}
          fetcher={fetcher}
          onClick={disable}
          onSuccess={success}
          onError={error}
          disabled={buttonsDisabled}
        />
      </ShowIf>
      <ShowIf condition={showCancelButton(offer)}>
        <OfferDetailsCancelButton
          offer={offer}
          fetcher={fetcher}
          onClick={disable}
          onSuccess={success}
          onError={error}
          disabled={buttonsDisabled}
        />
      </ShowIf>
    </OfferDetailsButtonsLayout>
  )
}
