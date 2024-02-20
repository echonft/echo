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
import { validateOffer } from '@echo/api/fetchers/validate-offer'
import { getCollections } from '@echo/api/providers/get-collections'
import { DependenciesProvider } from '@echo/ui/providers/dependencies-provider'
import { isStorybook } from '@echo/utils/constants/is-storybook'
import { approveErc721Contract } from '@echo/web3/helpers/wagmi/approve-erc721-contract'
import { disconnectWallet } from '@echo/web3/helpers/wagmi/disconnect-wallet'
import { executeSwap } from '@echo/web3/helpers/wagmi/execute-swap'
import { getAccount } from '@echo/web3/helpers/wagmi/get-account'
import { getErc721ContractApproval } from '@echo/web3/helpers/wagmi/get-erc721-contract-approval'
import { signNonce } from '@echo/web3/helpers/wagmi/sign-nonce'
import { signOffer } from '@echo/web3/helpers/wagmi/sign-offer'
import { switchChain } from '@echo/web3/helpers/wagmi/switch-chain'
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
        getCollections,
        getErc721ContractApproval,
        getNonce,
        getOfferSignature,
        getWallets,
        rejectOffer,
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
