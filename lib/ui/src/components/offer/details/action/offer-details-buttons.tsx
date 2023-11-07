'use client'
import { getOfferSignatureFetcher } from '@echo/api/services/fetcher/get-offer-signature-fetcher'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { assertOfferState } from '@echo/model/helpers/offer/assert/assert-offer-state'
import type { Offer } from '@echo/model/types/offer'
import { ShowIf } from '@echo/ui/components/base/utils/show-if'
import { OfferDetailsAcceptButton } from '@echo/ui/components/offer/details/action/offer-details-accept-button'
import { OfferDetailsCancelButton } from '@echo/ui/components/offer/details/action/offer-details-cancel-button'
import { OfferDetailsRejectButton } from '@echo/ui/components/offer/details/action/offer-details-reject-button'
import { OfferDetailsSwapButton } from '@echo/ui/components/offer/details/action/offer-details-swap-button'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { HexString } from '@echo/utils/types/hex-string'
import { clsx } from 'clsx'
import { type FunctionComponent, useState } from 'react'

interface Props {
  offer: Offer
  isCreator: boolean
  token: string
  cancelOfferFetcher: (offerId: string, token: string | undefined) => Promise<OfferResponse>
  acceptOfferFetcher: (
    offerId: string,
    signature: HexString | undefined,
    token: string | undefined
  ) => Promise<OfferResponse>
  rejectOfferFetcher: (offerId: string, token: string | undefined) => Promise<OfferResponse>
  completeOfferFetcher: (
    offerId: string,
    transactionId: HexString | undefined,
    token: string | undefined
  ) => Promise<OfferResponse>
  onSuccess?: (offer: Offer) => unknown
  onError?: EmptyFunction
}

function showAcceptButton(offer: Offer, isCreator: boolean) {
  try {
    assertOfferState(offer, 'ACCEPTED')
    return !isCreator
  } catch (e) {
    return false
  }
}

function showCancelButton(offer: Offer, isCreator: boolean) {
  try {
    assertOfferState(offer, 'CANCELLED')
    return offer.state === 'ACCEPTED' || isCreator
  } catch (e) {
    return false
  }
}

function showRejectButton(offer: Offer, isCreator: boolean) {
  try {
    assertOfferState(offer, 'REJECTED')
    return !isCreator
  } catch (e) {
    return false
  }
}

function showSwapButton(offer: Offer, isCreator: boolean) {
  try {
    assertOfferState(offer, 'COMPLETED')
    return isCreator
  } catch (e) {
    return false
  }
}

export const OfferDetailsButtons: FunctionComponent<Props> = ({
  offer,
  token,
  isCreator,
  acceptOfferFetcher,
  rejectOfferFetcher,
  cancelOfferFetcher,
  completeOfferFetcher,
  onSuccess
}) => {
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
          token={token}
          acceptOfferFetcher={acceptOfferFetcher}
          onClick={disable}
          onSuccess={success}
          onError={error}
          onCancel={enable}
          disabled={buttonsDisabled}
        />
      </ShowIf>
      <ShowIf condition={showSwapButton(offer, isCreator)}>
        <OfferDetailsSwapButton
          offer={offer}
          token={token}
          getOfferSignatureFetcher={getOfferSignatureFetcher}
          completeOfferFetcher={completeOfferFetcher}
          onClick={disable}
          onSuccess={success}
          onError={error}
          onCancel={enable}
          disabled={buttonsDisabled}
        />
      </ShowIf>
      <ShowIf condition={showRejectButton(offer, isCreator)}>
        <OfferDetailsRejectButton
          offer={offer}
          token={token}
          rejectOfferFetcher={rejectOfferFetcher}
          onClick={disable}
          onSuccess={success}
          onError={error}
          disabled={buttonsDisabled}
        />
      </ShowIf>
      <ShowIf condition={showCancelButton(offer, isCreator)}>
        <OfferDetailsCancelButton
          offer={offer}
          token={token}
          cancelOfferFetcher={cancelOfferFetcher}
          onClick={disable}
          onSuccess={success}
          onError={error}
          disabled={buttonsDisabled}
        />
      </ShowIf>
    </div>
  )
}
