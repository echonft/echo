'use client'
import { addWallet } from '@echo/api/services/fetcher/add-wallet'
import { getNonce } from '@echo/api/services/fetcher/get-nonce'
import type { AuthUser } from '@echo/model/types/auth-user'
import { BannerManager } from '@echo/ui/components/layout/banner/banner-manager'
import { CalloutManager } from '@echo/ui/components/layout/callout/callout-manager'
import { HeaderSelector } from '@echo/ui/components/layout/header/header-selector'
import { MainSectionLayout } from '@echo/ui/components/layout/main-section-layout'
import { ConnectWalletButton } from '@echo/ui/components/wallet/connect-wallet-button'
import { PAGE_LAYOUT_BG_DEFAULT } from '@echo/ui/constants/page-layout-background'
import type { PageLayoutBackground } from '@echo/ui/types/page-layout-background'
import { signNonce } from '@echo/web3/helpers/wagmi/fetcher/sign-nonce'
import { account } from '@echo/web3/helpers/wagmi/provider/account'
import { chain } from '@echo/web3/helpers/wagmi/provider/chain'
import { clsx } from 'clsx'
import { signOut } from 'next-auth/react'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  background?: PageLayoutBackground
  headerVariants?: {
    logoOnly?: boolean
  }
  user?: AuthUser
}

export const PageLayout: FunctionComponent<PropsWithChildren<Props>> = ({
  background = PAGE_LAYOUT_BG_DEFAULT,
  headerVariants,
  user,
  children
}) => {
  return (
    <div
      className={clsx(
        'w-full',
        'h-full',
        'overflow-y-auto',
        background === PAGE_LAYOUT_BG_DEFAULT
          ? 'bg-dark-500'
          : ['bg-home', 'bg-[length:100%_41.4375rem]', 'bg-no-repeat']
      )}
    >
      <HeaderSelector
        logoOnly={Boolean(headerVariants?.logoOnly)}
        fetcher={{ addWallet, getNonce, signNonce }}
        provider={{ account, chain, signOut }}
        renderConnect={({ isConnecting, show }) => <ConnectWalletButton isConnecting={isConnecting} onClick={show} />}
        user={user}
      />
      <MainSectionLayout>
        {children}
        <CalloutManager />
        <BannerManager />
      </MainSectionLayout>
    </div>
  )
}
