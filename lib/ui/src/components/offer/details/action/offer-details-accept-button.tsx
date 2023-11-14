'use-client'
import type { AcceptOfferArgs } from '@echo/api/services/fetcher/accept-offer'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import type { Offer } from '@echo/model/types/offer'
import { Web3Provider } from '@echo/ui/components/base/utils/web3-provider'
import { OfferDetailsAcceptModal } from '@echo/ui/components/offer/details/action/accept/offer-details-accept-modal'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { Fetcher } from '@echo/utils/types/fetcher'
import type { HexString } from '@echo/utils/types/hex-string'
import type { ApproveErc721ContractArgs } from '@echo/web3/helpers/wagmi/fetcher/approve-erc721-contract'
import type { GetErc721ContractApprovalArgs } from '@echo/web3/helpers/wagmi/fetcher/get-erc721-contract-approval'
import type { SignOfferArgs } from '@echo/web3/helpers/wagmi/fetcher/sign-offer'
import type { ChainProvider } from '@echo/web3/helpers/wagmi/provider/chain'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent, useState } from 'react'

interface Props {
  offer: Offer
  token: string
  fetcher: {
    approveErc721Contract: Fetcher<HexString, ApproveErc721ContractArgs>
    getErc721ContractApproval: Fetcher<boolean, GetErc721ContractApprovalArgs>
    acceptOffer: Fetcher<OfferResponse, AcceptOfferArgs>
    signOffer: Fetcher<HexString, SignOfferArgs>
  }
  provider: {
    chain: ChainProvider
  }
  disabled?: boolean
  onClick?: EmptyFunction
  onSuccess?: (offer: Offer) => unknown
  onCancel?: EmptyFunction
}

export const OfferDetailsAcceptButton: FunctionComponent<Props> = ({
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
        <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('acceptBtn')}</span>
      </button>
      <Web3Provider>
        <OfferDetailsAcceptModal
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
