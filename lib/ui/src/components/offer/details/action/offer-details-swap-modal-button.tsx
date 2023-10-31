import type { EmptyResponse } from '@echo/api/types/responses/empty-response'
import type { Offer } from '@echo/model/types/offer'
import { OfferDetailsSwapModalSwapButton } from '@echo/ui/components/offer/details/action/offer-details-swap-modal-swap-button'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { ErrorFunction } from '@echo/utils/types/error-function'
import type { HexString } from '@echo/utils/types/hex-string'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  offer: Offer
  token: string
  chainId: number | undefined
  signature: HexString | undefined
  completeOfferFetcher: (
    offerId: string,
    transactionId: HexString | undefined,
    token: string | undefined
  ) => Promise<EmptyResponse>
  onLoading?: EmptyFunction
  onSuccess?: EmptyFunction
  onError?: ErrorFunction
}

export const OfferDetailsSwapModalButton: FunctionComponent<Props> = ({
  offer,
  token,
  chainId,
  signature,
  completeOfferFetcher,
  onLoading,
  onSuccess,
  onError
}) => {
  const t = useTranslations('offer.details.swapModal')

  if (isNil(signature) || isNil(chainId)) {
    return (
      <button className={clsx('btn-gradient', 'btn-size-alt', 'group', 'animate-pulse')} disabled={true}>
        <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('acceptBtn')}</span>
      </button>
    )
  }
  return (
    <OfferDetailsSwapModalSwapButton
      offer={offer}
      chainId={chainId}
      signature={signature}
      token={token}
      completeOfferFetcher={completeOfferFetcher}
      onLoading={onLoading}
      onSuccess={onSuccess}
      onError={onError}
    />
  )
}
