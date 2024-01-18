'use client'
import { acceptOffer } from '@echo/api/services/fetchers/accept-offer'
import { cancelOffer } from '@echo/api/services/fetchers/cancel-offer'
import { getOffer } from '@echo/api/services/fetchers/get-offer'
import { getOfferSignature } from '@echo/api/services/fetchers/get-offer-signature'
import { rejectOffer } from '@echo/api/services/fetchers/reject-offer'
import { type AuthUser } from '@echo/model/types/auth-user'
import { type Offer } from '@echo/model/types/offer'
import { PaddedContainer } from '@echo/ui/components/layout/padded-container'
import { OfferDetails } from '@echo/ui/components/offer/details/offer-details'
import { approveErc721Contract } from '@echo/web3/helpers/wagmi/fetchers/approve-erc721-contract'
import { executeSwap } from '@echo/web3/helpers/wagmi/fetchers/execute-swap'
import { getErc721ContractApproval } from '@echo/web3/helpers/wagmi/fetchers/get-erc721-contract-approval'
import { signOffer } from '@echo/web3/helpers/wagmi/fetchers/sign-offer'
import { chain } from '@echo/web3/helpers/wagmi/providers/chain'
import { type FunctionComponent } from 'react'

interface Props {
  offer: Offer
  user: AuthUser
}

export const OfferDetailsApiProvided: FunctionComponent<Props> = ({ offer, user }) => {
  return (
    <PaddedContainer>
      <OfferDetails
        offer={offer}
        isCreator={user.username === offer.sender?.username}
        fetcher={{
          approveErc721Contract,
          getErc721ContractApproval,
          acceptOffer,
          cancelOffer,
          executeSwap,
          getOffer,
          getOfferSignature,
          rejectOffer,
          signOffer
        }}
        provider={{
          chain
        }}
      />
    </PaddedContainer>
  )
}
