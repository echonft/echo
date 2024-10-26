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
import { login, logout } from '@echo/auth/auth'
import { DependenciesProvider } from '@echo/ui/components/base/dependencies-provider'
import { getBaseLogger } from '@echo/utils/services/logger'
import { acceptOffer } from '@echo/web3-dom/services/accept-offer'
import { approveErc721Contract } from '@echo/web3-dom/services/approve-erc721-contract'
import { areNftsInEscrow } from '@echo/web3-dom/services/are-nfts-in-escrow'
import { cancelOffer } from '@echo/web3-dom/services/cancel-offer'
import { createOffer } from '@echo/web3-dom/services/create-offer'
import { disconnectWallet } from '@echo/web3-dom/services/disconnect-wallet'
import { getAccount } from '@echo/web3-dom/services/get-account'
import { getAllErc20TokenBalances } from '@echo/web3-dom/services/get-all-erc20-token-balances'
import { getEchoTradingFees } from '@echo/web3-dom/services/get-echo-trading-fees'
import { getErc20TokenBalance } from '@echo/web3-dom/services/get-erc20-token-balance'
import { getErc721ContractApproval } from '@echo/web3-dom/services/get-erc721-contract-approval'
import { redeemOffer } from '@echo/web3-dom/services/redeem-offer'
import { signNonce } from '@echo/web3-dom/services/sign-nonce'
import { swap } from '@echo/web3-dom/services/swap'
import { switchChain } from '@echo/web3-dom/services/switch-chain'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const Dependencies: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <DependenciesProvider
      dependencies={{
        acceptOffer,
        addWallet,
        approveErc721Contract,
        areNftsInEscrow,
        cancelListing,
        cancelOffer,
        createListing,
        createOffer,
        disconnectWallet,
        getAccount,
        getAllErc20TokenBalances,
        getEchoTradingFees,
        getErc20TokenBalance,
        getErc721ContractApproval,
        getNonce,
        getOfferByIdContract,
        getWallets,
        login,
        logger: getBaseLogger('web', {
          baseMergeObject: { component: 'client-component' }
        }),
        logout,
        redeemOffer,
        rejectOffer,
        searchCollections,
        searchUsers,
        signNonce,
        swap,
        switchChain
      }}
    >
      {children}
    </DependenciesProvider>
  )
}
