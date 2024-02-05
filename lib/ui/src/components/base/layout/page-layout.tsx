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
import { getCollections } from '@echo/api/providers/get-collections'
import type { AuthUser } from '@echo/model/types/auth-user'
import { BannerManager } from '@echo/ui/components/base/banner/banner-manager'
import { CalloutManager } from '@echo/ui/components/base/callout/callout-manager'
import { HeaderSwitch } from '@echo/ui/components/base/header/header-switch'
import { MainSectionLayout } from '@echo/ui/components/base/layout/main-section-layout'
import {
  PAGE_LAYOUT_BG_COLLECTIONS,
  PAGE_LAYOUT_BG_DEFAULT,
  PAGE_LAYOUT_BG_GREEN_GRADIENT,
  PAGE_LAYOUT_BG_HOME,
  PAGE_LAYOUT_BG_RED_GRADIENT,
  PAGE_LAYOUT_BG_YELLOW_GRADIENT
} from '@echo/ui/constants/page-layout-background'
import { DependenciesProvider } from '@echo/ui/providers/dependencies-provider'
import type { PageLayoutBackground } from '@echo/ui/types/page-layout-background'
import type { Nullable } from '@echo/utils/types/nullable'
import { approveErc721Contract } from '@echo/web3/helpers/wagmi/approve-erc721-contract'
import { disconnectWallet } from '@echo/web3/helpers/wagmi/disconnect-wallet'
import { executeSwap } from '@echo/web3/helpers/wagmi/execute-swap'
import { getAccount } from '@echo/web3/helpers/wagmi/get-account'
import { getErc721ContractApproval } from '@echo/web3/helpers/wagmi/get-erc721-contract-approval'
import { signNonce } from '@echo/web3/helpers/wagmi/sign-nonce'
import { signOffer } from '@echo/web3/helpers/wagmi/sign-offer'
import { switchChain } from '@echo/web3/helpers/wagmi/switch-chain'
import { clsx } from 'clsx'
import { signIn, signOut } from 'next-auth/react'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  background?: PageLayoutBackground
  headerVariants?: {
    logoOnly?: boolean
  }
  user?: Nullable<AuthUser>
}

export const PageLayout: FunctionComponent<PropsWithChildren<Props>> = ({
  background = PAGE_LAYOUT_BG_DEFAULT,
  headerVariants,
  user,
  children
}) => {
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
        switchChain
      }}
    >
      <div
        className={clsx(
          'w-full',
          'h-full',
          'overflow-y-auto',
          background === PAGE_LAYOUT_BG_DEFAULT && 'bg-dark-500',
          background === PAGE_LAYOUT_BG_HOME && ['bg-home', 'bg-[length:100%_41.4375rem]', 'bg-no-repeat'],
          background === PAGE_LAYOUT_BG_COLLECTIONS && ['bg-home', 'bg-no-repeat'],
          background === PAGE_LAYOUT_BG_GREEN_GRADIENT && ['bg-gradientGreen', 'bg-no-repeat'],
          background === PAGE_LAYOUT_BG_YELLOW_GRADIENT && ['bg-gradientYellow', 'bg-no-repeat'],
          background === PAGE_LAYOUT_BG_RED_GRADIENT && ['bg-gradientRed', 'bg-no-repeat']
        )}
      >
        <HeaderSwitch logoOnly={Boolean(headerVariants?.logoOnly)} user={user} />
        <MainSectionLayout>
          {children}
          <CalloutManager />
          <BannerManager />
        </MainSectionLayout>
      </div>
    </DependenciesProvider>
  )
}
