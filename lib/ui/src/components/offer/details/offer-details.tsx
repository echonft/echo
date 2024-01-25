'use client'
import type { AcceptOfferArgs } from '@echo/api/types/fetchers/accept-offer-args'
import type { CancelOfferArgs } from '@echo/api/types/fetchers/cancel-offer-args'
import type { GetOfferSignatureArgs } from '@echo/api/types/fetchers/get-offer-signature-args'
import type { RejectOfferArgs } from '@echo/api/types/fetchers/reject-offer-args'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import type { OfferSignatureResponse } from '@echo/api/types/responses/offer-signature-response'
import type { Offer } from '@echo/model/types/offer'
import { NftCardsContainer } from '@echo/ui/components/nft/card/layout/nft-cards-container'
import { OfferDetailsButtons } from '@echo/ui/components/offer/details/action/offer-details-buttons'
import { OfferDetailsInfoLayout } from '@echo/ui/components/offer/details/layout/offer-details-info-layout'
import { OfferDetailsItemsButtonsLayout } from '@echo/ui/components/offer/details/layout/offer-details-items-buttons-layout'
import { OfferDetailsLayout } from '@echo/ui/components/offer/details/layout/offer-details-layout'
import { OfferDetailsItemsSeparator } from '@echo/ui/components/offer/details/offer-details-items-separator'
import { OfferDetailsState } from '@echo/ui/components/offer/details/offer-details-state'
import { ListingOfferUserDetails } from '@echo/ui/components/user/listing-offer/listing-offer-user-details'
import { ALIGNMENT_CENTER } from '@echo/ui/constants/alignments'
import type { Fetcher } from '@echo/utils/types/fetcher'
import type { HexString } from '@echo/utils/types/hex-string'
import type { ApproveErc721ContractArgs } from '@echo/web3/types/approve-erc-721-contract-args'
import type { ChainProvider } from '@echo/web3/types/chain-provider'
import type { ExecuteSwapArgs } from '@echo/web3/types/execute-swap-args'
import type { GetErc721ContractApprovalArgs } from '@echo/web3/types/get-erc-721-contract-approval-args'
import type { SignOfferArgs } from '@echo/web3/types/sign-offer-args'
import { map, prop } from 'ramda'
import { type FunctionComponent, useEffect, useState } from 'react'

interface Props {
  offer: Offer
  isCreator: boolean
  fetcher: {
    approveErc721Contract: Fetcher<HexString, ApproveErc721ContractArgs>
    getErc721ContractApproval: Fetcher<boolean, GetErc721ContractApprovalArgs>
    acceptOffer: Fetcher<OfferResponse, AcceptOfferArgs>
    cancelOffer: Fetcher<OfferResponse, CancelOfferArgs>
    executeSwap: Fetcher<HexString, ExecuteSwapArgs>
    getOfferSignature: Fetcher<OfferSignatureResponse, GetOfferSignatureArgs>
    rejectOffer: Fetcher<OfferResponse, RejectOfferArgs>
    signOffer: Fetcher<HexString, SignOfferArgs>
  }
  provider: {
    chain: ChainProvider
  }
}

export const OfferDetails: FunctionComponent<Props> = ({ offer, isCreator, fetcher, provider }) => {
  const [updatedOffer, setUpdatedOffer] = useState(offer)
  useEffect(() => {
    setUpdatedOffer(offer)
  }, [offer])
  const { state, sender, receiver, expiresAt, senderItems, receiverItems } = updatedOffer

  return (
    <OfferDetailsLayout>
      <OfferDetailsInfoLayout>
        <ListingOfferUserDetails user={isCreator ? receiver : sender} />
        <OfferDetailsState state={state} expiresAt={expiresAt} />
      </OfferDetailsInfoLayout>
      <OfferDetailsItemsButtonsLayout>
        <NftCardsContainer
          nfts={map(prop('nft'), isCreator ? receiverItems : senderItems)}
          alignment={ALIGNMENT_CENTER}
        />
        <OfferDetailsItemsSeparator />
        <NftCardsContainer
          nfts={map(prop('nft'), isCreator ? senderItems : receiverItems)}
          alignment={ALIGNMENT_CENTER}
        />
        <OfferDetailsButtons
          offer={updatedOffer}
          isCreator={isCreator}
          fetcher={fetcher}
          provider={provider}
          onSuccess={setUpdatedOffer}
        />
      </OfferDetailsItemsButtonsLayout>
    </OfferDetailsLayout>
  )
}
