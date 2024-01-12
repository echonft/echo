'use client'
import type { GetOfferArgs } from '@echo/api/services/fetcher/get-offer'
import type { GetOfferSignatureArgs } from '@echo/api/services/fetcher/get-offer-signature'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import type { OfferSignatureResponse } from '@echo/api/types/responses/offer-signature-response'
import { offerContext } from '@echo/model/sentry/contexts/offer-context'
import type { Offer } from '@echo/model/types/offer'
import { OfferDetailsSwapExecuteModal } from '@echo/ui/components/offer/details/action/swap/offer-details-swap-execute-modal'
import { OfferDetailsContractApprovalModal } from '@echo/ui/components/offer/details/offer-details-contract-approval-modal'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { Fetcher } from '@echo/utils/types/fetcher'
import type { HexString } from '@echo/utils/types/hex-string'
import type { ApproveErc721ContractArgs } from '@echo/web3/helpers/wagmi/fetcher/approve-erc721-contract'
import type { ExecuteSwapArgs } from '@echo/web3/helpers/wagmi/fetcher/execute-swap'
import type { GetErc721ContractApprovalArgs } from '@echo/web3/helpers/wagmi/fetcher/get-erc721-contract-approval'
import type { ChainProvider } from '@echo/web3/helpers/wagmi/provider/chain'
import { captureException } from '@sentry/nextjs'
import { useTranslations } from 'next-intl'
import { type FunctionComponent, useState } from 'react'
import useSWR from 'swr'

interface Props {
  offer: Offer
  open: boolean
  fetcher: {
    getOffer: Fetcher<OfferResponse, GetOfferArgs>
    getOfferSignature: Fetcher<OfferSignatureResponse, GetOfferSignatureArgs>
    executeSwap: Fetcher<HexString, ExecuteSwapArgs>
    approveErc721Contract: Fetcher<HexString, ApproveErc721ContractArgs>
    getErc721ContractApproval: Fetcher<boolean, GetErc721ContractApprovalArgs>
  }
  provider: {
    chain: ChainProvider
  }
  onClose?: EmptyFunction
  onSuccess?: (offer: Offer) => unknown
}

export const OfferDetailsSwapModal: FunctionComponent<Props> = ({
  offer,
  open,
  fetcher,
  provider,
  onClose,
  onSuccess
}) => {
  const t = useTranslations('offer.details.swapModal')
  const [approved, setApproved] = useState(false)
  // TODO Maybe we should add a line to check for the chain and if hes connected.
  // Because if wallet is locked it doesn't show as connected.
  const chainId = provider.chain()
  const { data: signatureResponse } = useSWR<
    OfferSignatureResponse,
    Error,
    (GetOfferSignatureArgs & Record<'name', string>) | undefined
  >(open ? { name: SWRKeys.offer.getSignature(offer), offerId: offer.id } : undefined, fetcher.getOfferSignature, {
    onError: (err) => {
      captureException(err, {
        contexts: offerContext(offer)
      })
    }
  })

  if (approved) {
    return (
      <OfferDetailsSwapExecuteModal
        offer={offer}
        chainId={chainId!}
        signature={signatureResponse?.signature}
        fetcher={fetcher}
        open={open}
        onSuccess={onSuccess}
        onClose={onClose}
      />
    )
  }

  return (
    <OfferDetailsContractApprovalModal
      items={offer.senderItems}
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
