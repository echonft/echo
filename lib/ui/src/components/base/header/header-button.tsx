'use client'
import { frontendRoutes } from '@echo/routing/constants/frontend-routes'
import type { Path } from '@echo/routing/types/path'
import { HeaderButtonProfilePicture } from '@echo/ui/components/base/header/header-button-profile-picture'
import { WalletButton } from '@echo/ui/components/base/wallet/wallet-button'
import { AuthUserStatus } from '@echo/ui/constants/auth-user-status'
import { useAccount } from '@echo/ui/hooks/use-account'
import { useAuthUser } from '@echo/ui/hooks/use-auth-user'
import { shortenAddress } from '@echo/web3-dom/helpers/shorten-address'
import { clsx } from 'clsx'
import Cookies from 'js-cookie'
import { usePathname, useRouter } from 'next/navigation'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

export const HeaderButton: FunctionComponent = () => {
  const router = useRouter()
  const { status } = useAuthUser()
  const { address } = useAccount()
  const path = usePathname() as Path

  if (status === AuthUserStatus.Authenticated && !isNil(address)) {
    return (
      <button
        className={clsx('btn-primary', 'group', '!py-0', '!pr-0', 'gap-4')}
        onClick={() => {
          router.push(frontendRoutes.user.profile.get())
        }}
      >
        <span className={clsx('btn-label-primary')}>{shortenAddress(address)}</span>
        <HeaderButtonProfilePicture />
      </button>
    )
  }

  return (
    <WalletButton
      onClick={() => {
        Cookies.set('callbackPath', path)
        router.push(frontendRoutes.login.wallet.get())
      }}
    />
  )
}
