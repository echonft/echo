'use client'
import { frontendRoutes } from '@echo/routing/constants/frontend-routes'
import type { Path } from '@echo/routing/types/path'
import { HeaderButtonProfilePicture } from '@echo/ui/components/base/header/header-button-profile-picture'
import { HeaderButtonWallet } from '@echo/ui/components/base/header/header-button-wallet'
import { HeaderButtonWalletStatusManager } from '@echo/ui/components/base/header/header-button-wallet-status-manager'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { WalletChainManager } from '@echo/ui/components/base/wallet/wallet-chain-manager'
import { AuthUserStatus } from '@echo/ui/constants/auth-user-status'
import { useAuthUser } from '@echo/ui/hooks/use-auth-user'
import { clsx } from 'clsx'
import Cookies from 'js-cookie'
import { usePathname } from 'next/navigation'
import { type FunctionComponent } from 'react'

export const HeaderButton: FunctionComponent = () => {
  const { status } = useAuthUser()
  const path = usePathname() as Path
  return (
    <InternalLink
      path={
        status === AuthUserStatus.Authenticated ? frontendRoutes.user.profile.get() : frontendRoutes.login.wallet.get()
      }
      onClick={() => {
        Cookies.set('callbackPath', path)
      }}
    >
      <div className={clsx('flex', 'flex-row', 'gap-4', 'h-max', 'w-max', 'group')}>
        <HeaderButtonWallet />
        <HeaderButtonProfilePicture />
        <HeaderButtonWalletStatusManager />
        <WalletChainManager />
      </div>
    </InternalLink>
  )
}
