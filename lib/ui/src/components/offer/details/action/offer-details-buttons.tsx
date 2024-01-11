'use client'
import type { AcceptOfferArgs } from '@echo/api/services/fetcher/accept-offer'
import type { CancelOfferArgs } from '@echo/api/services/fetcher/cancel-offer'
import type { GetOfferArgs } from '@echo/api/services/fetcher/get-offer'
import type { GetOfferSignatureArgs } from '@echo/api/services/fetcher/get-offer-signature'
import type { RejectOfferArgs } from '@echo/api/services/fetcher/reject-offer'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import type { OfferSignatureResponse } from '@echo/api/types/responses/offer-signature-response'
import {
  OFFER_STATE_ACCEPTED,
  OFFER_STATE_CANCELLED,
  OFFER_STATE_COMPLETED,
  OFFER_STATE_REJECTED
} from '@echo/model/constants/offer-states'
import { assertOfferState } from '@echo/model/helpers/offer/assert/assert-offer-state'
import type { Offer } from '@echo/model/types/offer'
import { ShowIf } from '@echo/ui/components/base/utils/show-if'
import { OfferDetailsAcceptButton } from '@echo/ui/components/offer/details/action/offer-details-accept-button'
import { OfferDetailsCancelButton } from '@echo/ui/components/offer/details/action/offer-details-cancel-button'
import { OfferDetailsRejectButton } from '@echo/ui/components/offer/details/action/offer-details-reject-button'
import { OfferDetailsSwapButton } from '@echo/ui/components/offer/details/action/offer-details-swap-button'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { Fetcher } from '@echo/utils/types/fetcher'
import type { HexString } from '@echo/utils/types/hex-string'
import type { ApproveErc721ContractArgs } from '@echo/web3/helpers/wagmi/fetcher/approve-erc721-contract'
import type { ExecuteSwapArgs } from '@echo/web3/helpers/wagmi/fetcher/execute-swap'
import type { GetErc721ContractApprovalArgs } from '@echo/web3/helpers/wagmi/fetcher/get-erc721-contract-approval'
import type { SignOfferArgs } from '@echo/web3/helpers/wagmi/fetcher/sign-offer'
import type { ChainProvider } from '@echo/web3/helpers/wagmi/provider/chain'
import { clsx } from 'clsx'
import { type FunctionComponent, useState } from 'react'

interface Props {
  offer: Offer
  isCreator: boolean
  fetcher: {
    approveErc721Contract: Fetcher<HexString, ApproveErc721ContractArgs>
    getErc721ContractApproval: Fetcher<boolean, GetErc721ContractApprovalArgs>
    acceptOffer: Fetcher<OfferResponse, AcceptOfferArgs>
    cancelOffer: Fetcher<OfferResponse, CancelOfferArgs>
    executeSwap: Fetcher<HexString, ExecuteSwapArgs>
    getOffer: Fetcher<OfferResponse, GetOfferArgs>
    getOfferSignature: Fetcher<OfferSignatureResponse, GetOfferSignatureArgs>
    rejectOffer: Fetcher<OfferResponse, RejectOfferArgs>
    signOffer: Fetcher<HexString, SignOfferArgs>
  }
  provider: {
    chain: ChainProvider
  }
  onSuccess?: (offer: Offer) => unknown
  onError?: EmptyFunction
}

function showAcceptButton(offer: Offer, isCreator: boolean) {
  try {
    assertOfferState(offer, OFFER_STATE_ACCEPTED)
    return !isCreator
  } catch (e) {
    return false
  }
}

function showCancelButton(offer: Offer, isCreator: boolean) {
  try {
    assertOfferState(offer, OFFER_STATE_CANCELLED)
    return offer.state === OFFER_STATE_ACCEPTED || isCreator
  } catch (e) {
    return false
  }
}

function showRejectButton(offer: Offer, isCreator: boolean) {
  try {
    assertOfferState(offer, OFFER_STATE_REJECTED)
    return !isCreator
  } catch (e) {
    return false
  }
}

function showSwapButton(offer: Offer, isCreator: boolean) {
  try {
    assertOfferState(offer, OFFER_STATE_COMPLETED)
    return isCreator
  } catch (e) {
    return false
  }
}

export const OfferDetailsButtons: FunctionComponent<Props> = ({ offer, isCreator, fetcher, provider, onSuccess }) => {
  const [buttonsDisabled, setButtonsDisabled] = useState(false)
  const disable = () => setButtonsDisabled(true)
  const enable = () => setButtonsDisabled(false)
  const success = (offer: Offer) => {
    setButtonsDisabled(false)
    onSuccess?.(offer)
  }
  const error = () => {
    setButtonsDisabled(false)
  }

  return (
    <div className={clsx('flex', 'flex-row', 'gap-8')}>
      <ShowIf condition={showAcceptButton(offer, isCreator)}>
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
      <ShowIf condition={showSwapButton(offer, isCreator)}>
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
      <ShowIf condition={showRejectButton(offer, isCreator)}>
        <OfferDetailsRejectButton
          offer={offer}
          fetcher={fetcher}
          onClick={disable}
          onSuccess={success}
          onError={error}
          disabled={buttonsDisabled}
        />
      </ShowIf>
      <ShowIf condition={showCancelButton(offer, isCreator)}>
        <OfferDetailsCancelButton
          offer={offer}
          fetcher={fetcher}
          onClick={disable}
          onSuccess={success}
          onError={error}
          disabled={buttonsDisabled}
        />
      </ShowIf>
    </div>
  )
}
