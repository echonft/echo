'use client'
import type { EmptyResponse } from '@echo/api/types/responses/empty-response'
import type { Offer } from '@echo/model/types/offer'
import { OfferDetailsAcceptModalAcceptButton } from '@echo/ui/components/offer/details/action/offer-details-accept-modal-accept-button'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { HexString } from '@echo/utils/types/hex-string'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  offer: Offer
  chainId: number | undefined
  token: string
  acceptOfferFetcher: (
    offerId: string,
    signature: HexString | undefined,
    token: string | undefined
  ) => Promise<EmptyResponse>
  onLoading?: EmptyFunction
  onSuccess?: EmptyFunction
  onError?: (error: Error) => unknown
}

export const OfferDetailsAcceptModalButton: FunctionComponent<Props> = ({
  offer,
  chainId,
  token,
  acceptOfferFetcher,
  onLoading,
  onSuccess,
  onError
}) => {
  const t = useTranslations('offer.details.acceptModal')
  if (isNil(chainId)) {
    return (
      <button className={clsx('btn-gradient', 'btn-size-alt', 'group', 'animate-pulse')} disabled={true}>
        <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('btn')}</span>
      </button>
    )
  }
  return (
    <OfferDetailsAcceptModalAcceptButton
      offer={offer}
      chainId={chainId}
      token={token}
      acceptOfferFetcher={acceptOfferFetcher}
      onLoading={onLoading}
      onSuccess={onSuccess}
      onError={onError}
    />
  )
}
