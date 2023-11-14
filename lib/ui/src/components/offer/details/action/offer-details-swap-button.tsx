'use-client'
import type { GetOfferArgs } from '@echo/api/services/fetcher/get-offer'
import type { GetOfferSignatureArgs } from '@echo/api/services/fetcher/get-offer-signature'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import type { OfferSignatureResponse } from '@echo/api/types/responses/offer-signature-response'
import type { Offer } from '@echo/model/types/offer'
import { Web3Provider } from '@echo/ui/components/base/utils/web3-provider'
import { OfferDetailsSwapModal } from '@echo/ui/components/offer/details/action/swap/offer-details-swap-modal'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { Fetcher } from '@echo/utils/types/fetcher'
import type { HexString } from '@echo/utils/types/hex-string'
import type { ApproveErc721ContractArgs } from '@echo/web3/helpers/wagmi/fetcher/approve-erc721-contract'
import type { ExecuteSwapArgs } from '@echo/web3/helpers/wagmi/fetcher/execute-swap'
import type { GetErc721ContractApprovalArgs } from '@echo/web3/helpers/wagmi/fetcher/get-erc721-contract-approval'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent, useState } from 'react'

interface Props {
  offer: Offer
  token: string
  fetcher: {
    getOffer: Fetcher<OfferResponse, GetOfferArgs>
    getOfferSignature: Fetcher<OfferSignatureResponse, GetOfferSignatureArgs>
    executeSwap: Fetcher<HexString, ExecuteSwapArgs>
    approveErc721Contract: Fetcher<HexString, ApproveErc721ContractArgs>
    getErc721ContractApproval: Fetcher<boolean, GetErc721ContractApprovalArgs>
  }
  provider: {
    chain: () => number | undefined
  }
  disabled?: boolean
  onClick?: EmptyFunction
  onSuccess?: (offer: Offer) => unknown
  onCancel?: EmptyFunction
}

export const OfferDetailsSwapButton: FunctionComponent<Props> = ({
  offer,
  token,
  fetcher,
  provider,
  disabled,
  onClick,
  onSuccess,
  onCancel
}) => {
  const t = useTranslations('offer.details')
  const [modalShown, setModalShown] = useState(false)

  return (
    <>
      <button
        className={clsx('btn-gradient', 'btn-size-alt', 'group')}
        onClick={() => {
          onClick?.()
          setModalShown(true)
        }}
        disabled={disabled}
      >
        <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('completeBtn')}</span>
      </button>
      <Web3Provider>
        <OfferDetailsSwapModal
          open={modalShown}
          offer={offer}
          token={token}
          fetcher={fetcher}
          provider={provider}
          onSuccess={(offer: Offer) => {
            setModalShown(false)
            onSuccess?.(offer)
          }}
          onClose={() => {
            setModalShown(false)
            onCancel?.()
          }}
        />
      </Web3Provider>
    </>
  )
}
