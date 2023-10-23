import type { EmptyResponse } from '@echo/api/types/responses/empty-response'
import type { Contract } from '@echo/model/types/contract'
import type { Offer } from '@echo/model/types/offer'
import { OfferDetailsAcceptModalAcceptButton } from '@echo/ui/components/offer/details/action/offer-details-accept-modal-accept-button'
import { OfferDetailsApproveContractButton } from '@echo/ui/components/offer/details/action/offer-details-approve-contract-button'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { ErrorFunction } from '@echo/utils/types/error-function'
import type { HexString } from '@echo/utils/types/hex-string'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  approvalPending: boolean
  contract: Contract | undefined
  offer: Offer
  token: string
  acceptOfferFetcher: (
    offerId: string,
    signature: HexString | undefined,
    token: string | undefined
  ) => Promise<EmptyResponse>
  chainId: number | undefined
  onSuccess?: EmptyFunction
  onError?: ErrorFunction
}

export const OfferDetailsAcceptModalButtons: FunctionComponent<Props> = ({
  approvalPending,
  contract,
  offer,
  token,
  chainId,
  acceptOfferFetcher,
  onSuccess,
  onError
}) => {
  const t = useTranslations('offer.details.acceptModal')

  if (approvalPending || isNil(chainId)) {
    return (
      <button className={clsx('btn-gradient', 'btn-size-alt', 'group', 'animate-pulse')} disabled={true}>
        <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('acceptBtn')}</span>
      </button>
    )
  }
  if (isNil(contract)) {
    return (
      <OfferDetailsAcceptModalAcceptButton
        offer={offer}
        chainId={chainId}
        token={token}
        acceptOfferFetcher={acceptOfferFetcher}
        onSuccess={onSuccess}
        onError={onError}
      />
    )
  }
  return <OfferDetailsApproveContractButton contract={contract} />
}
