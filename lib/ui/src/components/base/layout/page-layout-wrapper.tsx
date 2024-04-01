'use client'
import { acceptOffer } from '@echo/api/fetchers/accept-offer'
import { addWallet } from '@echo/api/fetchers/add-wallet'
import { cancelListing } from '@echo/api/fetchers/cancel-listing'
import { cancelOffer } from '@echo/api/fetchers/cancel-offer'
import { createListing } from '@echo/api/fetchers/create-listing'
import { createOffer } from '@echo/api/fetchers/create-offer'
import { getNonce } from '@echo/api/fetchers/get-nonce'
import { getOfferSignature } from '@echo/api/fetchers/get-offer-signature'
import { getWallets } from '@echo/api/fetchers/get-wallets'
import { rejectOffer } from '@echo/api/fetchers/reject-offer'
import { searchCollections } from '@echo/api/fetchers/search-collections'
import { searchUsers } from '@echo/api/fetchers/search-users'
import { validateOffer } from '@echo/api/fetchers/validate-offer'
import { DependenciesProvider } from '@echo/ui/providers/dependencies-provider'
import { isStorybook } from '@echo/utils/constants/is-storybook'
import { approveErc721Contract } from '@echo/web3-dom/helpers/approve-erc721-contract'
import { disconnectWallet } from '@echo/web3-dom/helpers/disconnect-wallet'
import { executeSwap } from '@echo/web3-dom/helpers/execute-swap'
import { getAccount } from '@echo/web3-dom/helpers/get-account'
import { getErc721ContractApproval } from '@echo/web3-dom/helpers/get-erc721-contract-approval'
import { signNonce } from '@echo/web3-dom/helpers/sign-nonce'
import { signOffer } from '@echo/web3-dom/helpers/sign-offer'
import { switchChain } from '@echo/web3-dom/helpers/switch-chain'
import { signIn, signOut } from 'next-auth/react'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const PageLayoutWrapper: FunctionComponent<PropsWithChildren> = ({ children }) => {
  if (isStorybook) {
    return <>{children}</>
  }
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
        executeSwap,
        getAccount,
        getErc721ContractApproval,
        getNonce,
        getOfferSignature,
        getWallets,
        rejectOffer,
        searchCollections,
        searchUsers,
        signIn: function () {
          return signIn('discord')
        },
        signNonce,
        signOffer,
        signOut,
        switchChain,
        validateOffer
      }}
    >
      {children}
    </DependenciesProvider>
  )
}
