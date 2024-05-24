'use client'
import { acceptOffer } from '@echo/api/fetchers/accept-offer'
import { addWallet } from '@echo/api/fetchers/add-wallet'
import { cancelListing } from '@echo/api/fetchers/cancel-listing'
import { cancelOffer } from '@echo/api/fetchers/cancel-offer'
import { createListing } from '@echo/api/fetchers/create-listing'
import { createOffer } from '@echo/api/fetchers/create-offer'
import { getNonce } from '@echo/api/fetchers/get-nonce'
import { getWallets } from '@echo/api/fetchers/get-wallets'
import { rejectOffer } from '@echo/api/fetchers/reject-offer'
import { searchCollections } from '@echo/api/fetchers/search-collections'
import { searchUsers } from '@echo/api/fetchers/search-users'
import { DependenciesProvider } from '@echo/ui/providers/dependencies-provider'
import { approveErc721Contract } from '@echo/web3-dom/helpers/approve-erc721-contract'
import { disconnectWallet } from '@echo/web3-dom/helpers/disconnect-wallet'
import { getAccount } from '@echo/web3-dom/helpers/get-account'
import { getErc721ContractApproval } from '@echo/web3-dom/helpers/get-erc721-contract-approval'
import { signNonce } from '@echo/web3-dom/helpers/sign-nonce'
import { switchChain } from '@echo/web3-dom/helpers/switch-chain'
import { signIn, signOut } from 'next-auth/react'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const Dependencies: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <DependenciesProvider
      dependencies={{
        acceptOffer,
        addWallet,
        approveErc721Contract,
        cancelListing,
        cancelOffer,
        createListing,
        createOffer,
        disconnectWallet,
        getAccount,
        getErc721ContractApproval,
        getNonce,
        getWallets,
        rejectOffer,
        searchCollections,
        searchUsers,
        signIn: function () {
          return signIn('discord')
        },
        signNonce,
        signOut,
        switchChain
      }}
    >
      {children}
    </DependenciesProvider>
  )
}
