'use client'
import type { AcceptOfferArgs } from '@echo/api/services/fetcher/accept-offer'
import type { CancelOfferArgs } from '@echo/api/services/fetcher/cancel-offer'
import type { GetOfferArgs } from '@echo/api/services/fetcher/get-offer'
import type { GetOfferSignatureArgs } from '@echo/api/services/fetcher/get-offer-signature'
import type { RejectOfferArgs } from '@echo/api/services/fetcher/reject-offer'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import type { OfferSignatureResponse } from '@echo/api/types/responses/offer-signature-response'
import type { Offer } from '@echo/model/types/offer'
import { ItemsDetailsSeparator } from '@echo/ui/components/item/details/items-details-separator'
import { OfferDetailsButtons } from '@echo/ui/components/offer/details/action/offer-details-buttons'
import { OfferDetailsItemsContainer } from '@echo/ui/components/offer/details/offer-details-items-container'
import { OfferDetailsState } from '@echo/ui/components/offer/details/offer-details-state'
import { UserDetailsContainer } from '@echo/ui/components/shared/user-details-container'
import { SWAP_DIRECTION_IN, SWAP_DIRECTION_OUT } from '@echo/ui/constants/swap-direction'
import { getOfferDetailsContainerBackgroundImage } from '@echo/ui/helpers/offer/get-offer-details-container-background-image'
import type { Fetcher } from '@echo/utils/types/fetcher'
import type { HexString } from '@echo/utils/types/hex-string'
import type { ApproveErc721ContractArgs } from '@echo/web3/helpers/wagmi/fetcher/approve-erc721-contract'
import type { ExecuteSwapArgs } from '@echo/web3/helpers/wagmi/fetcher/execute-swap'
import type { GetErc721ContractApprovalArgs } from '@echo/web3/helpers/wagmi/fetcher/get-erc721-contract-approval'
import type { SignOfferArgs } from '@echo/web3/helpers/wagmi/fetcher/sign-offer'
import type { ChainProvider } from '@echo/web3/helpers/wagmi/provider/chain'
import { clsx } from 'clsx'
import { type FunctionComponent, useEffect, useState } from 'react'

interface Props {
  offer: Offer
  isCreator: boolean
  token: string
  fetcher: {
    approveErc721Contract: Fetcher<HexString, ApproveErc721ContractArgs>
    getErc721ContractApproval: Fetcher<boolean, GetErc721ContractApprovalArgs>
    acceptOffer: Fetcher<OfferResponse, AcceptOfferArgs>
    cancelOffer: Fetcher<OfferResponse, CancelOfferArgs>
    executeSwap: Fetcher<HexString, ExecuteSwapArgs>
    getOffer: Fetcher<OfferResponse, GetOfferArgs>
    getOfferSignature: Fetcher<OfferSignatureResponse, GetOfferSignatureArgs>
    rejectOffer: Fetcher<OfferResponse, RejectOfferArgs>
    signOffer: Fetcher<HexString, SignOfferArgs>
  }
  provider: {
    chain: ChainProvider
  }
}

export const OfferDetails: FunctionComponent<Props> = ({ offer, isCreator, token, fetcher, provider }) => {
  const [updatedOffer, setUpdatedOffer] = useState(offer)
  useEffect(() => {
    setUpdatedOffer(offer)
  }, [offer])
  const { state, sender, receiver, expired, expiresAt, senderItems, receiverItems } = updatedOffer

  return (
    <div
      className={clsx(
        'flex',
        'flex-col',
        'gap-16',
        'p-4',
        'rounded-lg',
        getOfferDetailsContainerBackgroundImage(state),
        'bg-white/[0.05]'
      )}
    >
      <div className={clsx('flex', 'flex-row', 'justify-between', 'items-center')}>
        <UserDetailsContainer user={isCreator ? receiver : sender} />
        <OfferDetailsState state={state} expired={expired} expiresAt={expiresAt} />
      </div>
      <div className={clsx('flex', 'flex-col', 'gap-5')}>
        <OfferDetailsItemsContainer items={isCreator ? receiverItems : senderItems} direction={SWAP_DIRECTION_IN} />
        <div className={clsx('pb-4')}>
          <ItemsDetailsSeparator />
        </div>
        <OfferDetailsItemsContainer items={isCreator ? senderItems : receiverItems} direction={SWAP_DIRECTION_OUT} />
        <div className={clsx('flex', 'justify-center', 'items-center', 'pt-10', 'pb-5')}>
          <OfferDetailsButtons
            offer={updatedOffer}
            isCreator={isCreator}
            token={token}
            fetcher={fetcher}
            provider={provider}
            onSuccess={setUpdatedOffer}
          />
        </div>
      </div>
    </div>
  )
}
