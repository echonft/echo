'use client'
import { acceptOffer } from '@echo/api/fetchers/accept-offer'
import { cancelOffer } from '@echo/api/fetchers/cancel-offer'
import { getOfferSignature } from '@echo/api/fetchers/get-offer-signature'
import { rejectOffer } from '@echo/api/fetchers/reject-offer'
import { type AuthUser } from '@echo/model/types/auth-user'
import { OfferDetails } from '@echo/ui/components/offer/details/offer-details'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { approveErc721Contract } from '@echo/web3/helpers/wagmi/fetchers/approve-erc721-contract'
import { executeSwap } from '@echo/web3/helpers/wagmi/fetchers/execute-swap'
import { getErc721ContractApproval } from '@echo/web3/helpers/wagmi/fetchers/get-erc721-contract-approval'
import { signOffer } from '@echo/web3/helpers/wagmi/fetchers/sign-offer'
import { chain } from '@echo/web3/helpers/wagmi/providers/chain'
import { type FunctionComponent } from 'react'

interface Props {
  offer: OfferWithRole
  user: AuthUser
}

export const OfferDetailsPage: FunctionComponent<Props> = ({ offer }) => {
  return (
    <OfferDetails
      offer={offer}
      fetcher={{
        approveErc721Contract,
        getErc721ContractApproval,
        acceptOffer,
        cancelOffer,
        executeSwap,
        getOfferSignature,
        rejectOffer,
        signOffer
      }}
      provider={{
        chain
      }}
    />
  )
}
