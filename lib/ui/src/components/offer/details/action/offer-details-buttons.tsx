'use client'
import type { EmptyResponse } from '@echo/api/types/responses/empty-response'
import type { OfferSignatureResponse } from '@echo/api/types/responses/offer-signature-response'
import { assertOfferState } from '@echo/model/helpers/offer/assert/assert-offer-state'
import type { Offer } from '@echo/model/types/offer'
import { ShowIf } from '@echo/ui/components/base/utils/show-if'
import { OfferDetailsAcceptButton } from '@echo/ui/components/offer/details/action/offer-details-accept-button'
import { OfferDetailsCancelButton } from '@echo/ui/components/offer/details/action/offer-details-cancel-button'
import { OfferDetailsRejectButton } from '@echo/ui/components/offer/details/action/offer-details-reject-button'
import { OfferDetailsSwapButton } from '@echo/ui/components/offer/details/action/offer-details-swap-button'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { ErrorFunction } from '@echo/utils/types/error-function'
import type { HexString } from '@echo/utils/types/hex-string'
import { clsx } from 'clsx'
import { type FunctionComponent, useEffect, useState } from 'react'

interface Props {
  offer: Offer
  isCreator: boolean
  token: string
  getOfferSignatureFetcher: (offerId: string, token: string | undefined) => Promise<OfferSignatureResponse>
  cancelOfferFetcher: (offerId: string, token: string | undefined) => Promise<EmptyResponse>
  acceptOfferFetcher: (
    offerId: string,
    signature: HexString | undefined,
    token: string | undefined
  ) => Promise<EmptyResponse>
  rejectOfferFetcher: (offerId: string, token: string | undefined) => Promise<EmptyResponse>
  disabled?: boolean
  onSuccess?: EmptyFunction
  onError?: ErrorFunction
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
  getOfferSignatureFetcher,
  acceptOfferFetcher,
  rejectOfferFetcher,
  cancelOfferFetcher,
  disabled,
  onSuccess,
  onError
}) => {
  const [buttonsDisabled, setButtonsDisabled] = useState(disabled ?? false)
  useEffect(() => {
    setButtonsDisabled(disabled ?? false)
  }, [disabled])
  const disable = () => setButtonsDisabled(true)
  const enable = () => setButtonsDisabled(false)
  const success = () => {
    setButtonsDisabled(false)
    onSuccess?.()
  }
  const error = (error: Error) => {
    setButtonsDisabled(false)
    onError?.(error)
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
          onClick={disable}
          onSuccess={success}
          onError={error}
          onCancel={enable}
          disabled={buttonsDisabled}
        />
      </ShowIf>
      <ShowIf condition={showRejectButton(offer, isCreator)}>
        <OfferDetailsRejectButton
          offerId={offer.id}
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
          offerId={offer.id}
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
