'use client'
import { addWallet } from '@echo/api/fetchers/add-wallet'
import { cancelListing } from '@echo/api/fetchers/cancel-listing'
import { createListing } from '@echo/api/fetchers/create-listing'
import { getNonce } from '@echo/api/fetchers/get-nonce'
import { getOfferByIdContract } from '@echo/api/fetchers/get-offer-by-id-contract'
import { getWallets } from '@echo/api/fetchers/get-wallets'
import { rejectOffer } from '@echo/api/fetchers/reject-offer'
import { searchCollections } from '@echo/api/fetchers/search-collections'
import { searchUsers } from '@echo/api/fetchers/search-users'
import { signIn, signOut } from '@echo/auth/auth'
import { DependenciesProvider } from '@echo/ui/providers/dependencies-provider'
import { isDev } from '@echo/utils/constants/is-dev'
import { getBaseLogger } from '@echo/utils/services/logger'
import { acceptOffer as contractAcceptOffer } from '@echo/web3-dom/helpers/accept-offer'
import { approveErc721Contract } from '@echo/web3-dom/helpers/approve-erc721-contract'
import { areNftsInEscrow } from '@echo/web3-dom/helpers/are-nfts-in-escrow'
import { cancelOffer as contractCancelOffer } from '@echo/web3-dom/helpers/cancel-offer'
import { createOffer as contractCreateOffer } from '@echo/web3-dom/helpers/create-offer'
import { disconnectWallet } from '@echo/web3-dom/helpers/disconnect-wallet'
import { executeOffer as contractExecuteOffer } from '@echo/web3-dom/helpers/execute-offer'
import { getAccount } from '@echo/web3-dom/helpers/get-account'
import { getEchoTradingFees } from '@echo/web3-dom/helpers/get-echo-trading-fees'
import { getErc721ContractApproval } from '@echo/web3-dom/helpers/get-erc721-contract-approval'
import { redeemOffer as contractRedeemOffer } from '@echo/web3-dom/helpers/redeem-offer'
import { signNonce } from '@echo/web3-dom/helpers/sign-nonce'
import { switchChain } from '@echo/web3-dom/helpers/switch-chain'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const Dependencies: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <DependenciesProvider
      dependencies={{
        addWallet,
        approveErc721Contract,
        areNftsInEscrow,
        cancelListing,
        contractAcceptOffer,
        contractCancelOffer,
        contractCreateOffer,
        contractExecuteOffer,
        contractRedeemOffer,
        createListing,
        disconnectWallet,
        getAccount,
        getEchoTradingFees,
        getErc721ContractApproval,
        getNonce,
        getOfferByIdContract,
        getWallets,
        rejectOffer,
        searchCollections,
        searchUsers,
        signIn,
        signNonce,
        signOut,
        switchChain,
        logger: getBaseLogger('web', {
          baseMergeObject: { component: 'client-component' },
          override: { enabled: isDev }
        })
      }}
    >
      {children}
    </DependenciesProvider>
  )
}
