'use client'
import type { AcceptOfferArgs } from '@echo/api/types/fetchers/accept-offer-args'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import type { Offer } from '@echo/model/types/offer'
import { OfferDetailsAcceptSignModal } from '@echo/ui/components/offer/details/action/accept/offer-details-accept-sign-modal'
import { OfferDetailsContractApprovalModal } from '@echo/ui/components/offer/details/offer-details-contract-approval-modal'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { Fetcher } from '@echo/utils/types/fetcher'
import type { HexString } from '@echo/utils/types/hex-string'
import type { ApproveErc721ContractArgs } from '@echo/web3/types/approve-erc-721-contract-args'
import type { ChainProvider } from '@echo/web3/types/chain-provider'
import type { GetErc721ContractApprovalArgs } from '@echo/web3/types/get-erc-721-contract-approval-args'
import type { SignOfferArgs } from '@echo/web3/types/sign-offer-args'
import { useTranslations } from 'next-intl'
import { type FunctionComponent, useState } from 'react'

interface Props {
  offer: Offer
  open: boolean
  fetcher: {
    approveErc721Contract: Fetcher<HexString, ApproveErc721ContractArgs>
    getErc721ContractApproval: Fetcher<boolean, GetErc721ContractApprovalArgs>
    acceptOffer: Fetcher<OfferResponse, AcceptOfferArgs>
    signOffer: Fetcher<HexString, SignOfferArgs>
  }
  provider: {
    chain: ChainProvider
  }
  onClose?: EmptyFunction
  onSuccess?: (offer: Offer) => unknown
}

export const OfferDetailsAcceptModal: FunctionComponent<Props> = ({
  offer,
  open,
  fetcher,
  provider,
  onClose,
  onSuccess
}) => {
  const t = useTranslations('offer.details.acceptModal')
  // TODO Maybe we should add a line to check for the chain and if hes connected.
  // Because if wallet is locked it doesn't show as connected.
  const chainId = provider.chain()!
  const [approved, setApproved] = useState(false)

  if (approved) {
    return (
      <OfferDetailsAcceptSignModal
        offer={offer}
        chainId={chainId}
        fetcher={fetcher}
        open={open}
        onSuccess={onSuccess}
        onClose={onClose}
      />
    )
  }

  return (
    <OfferDetailsContractApprovalModal
      items={offer.receiverItems}
      open={open}
      title={t('title')}
      subtitle={t('approval.subtitle')}
      fetcher={fetcher}
      onSuccess={() => {
        setApproved(true)
      }}
      onClose={onClose}
    />
  )
}
