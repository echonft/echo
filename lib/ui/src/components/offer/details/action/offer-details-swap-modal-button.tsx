import type { Offer } from '@echo/model/types/offer'
import { OfferDetailsSwapModalSwapButton } from '@echo/ui/components/offer/details/action/offer-details-swap-modal-swap-button'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { HexString } from '@echo/utils/types/hex-string'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  offer: Offer
  chainId: number | undefined
  signature: HexString | undefined
  onLoading?: EmptyFunction
  onSuccess?: (offer: Offer) => unknown
  onError?: EmptyFunction
}

export const OfferDetailsSwapModalButton: FunctionComponent<Props> = ({
  offer,
  chainId,
  signature,
  onLoading,
  onSuccess,
  onError
}) => {
  const t = useTranslations('offer.details.swapModal')

  if (isNil(signature) || isNil(chainId)) {
    return (
      <button className={clsx('btn-gradient', 'btn-size-alt', 'group', 'animate-pulse')} disabled={true}>
        <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('btn')}</span>
      </button>
    )
  }
  return (
    <OfferDetailsSwapModalSwapButton
      offer={offer}
      chainId={chainId}
      signature={signature}
      onLoading={onLoading}
      onSuccess={onSuccess}
      onError={onError}
    />
  )
}
