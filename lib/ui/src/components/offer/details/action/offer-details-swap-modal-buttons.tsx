import type { EmptyResponse } from '@echo/api/types/responses/empty-response'
import type { Contract } from '@echo/model/types/contract'
import type { Offer } from '@echo/model/types/offer'
import { OfferDetailsApproveContractButton } from '@echo/ui/components/offer/details/action/offer-details-approve-contract-button'
import { OfferDetailsSwapModalSwapButton } from '@echo/ui/components/offer/details/action/offer-details-swap-modal-swap-button'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { ErrorFunction } from '@echo/utils/types/error-function'
import type { HexString } from '@echo/utils/types/hex-string'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  approvalPending: boolean
  offer: Offer
  token: string
  chainId: number | undefined
  contract: Contract | undefined
  signature: HexString | undefined
  completeOfferFetcher: (
    offerId: string,
    transactionId: HexString | undefined,
    token: string | undefined
  ) => Promise<EmptyResponse>
  onSuccess?: EmptyFunction
  onError?: ErrorFunction
}

export const OfferDetailsSwapModalButtons: FunctionComponent<Props> = ({
  approvalPending,
  offer,
  token,
  chainId,
  contract,
  signature,
  completeOfferFetcher,
  onSuccess,
  onError
}) => {
  const t = useTranslations('offer.details.swapModal')

  if (approvalPending || isNil(signature) || isNil(chainId)) {
    return (
      <button className={clsx('btn-gradient', 'btn-size-alt', 'group', 'animate-pulse')} disabled={true}>
        <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('acceptBtn')}</span>
      </button>
    )
  }
  if (isNil(contract)) {
    return (
      <OfferDetailsSwapModalSwapButton
        offer={offer}
        chainId={chainId}
        signature={signature}
        token={token}
        completeOfferFetcher={completeOfferFetcher}
        onSuccess={onSuccess}
        onError={onError}
      />
    )
  }
  return <OfferDetailsApproveContractButton contract={contract} />
}
