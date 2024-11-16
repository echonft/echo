'use client'
import type { User } from '@echo/model/types/user'
import { frontendRoutes } from '@echo/routing/constants/frontend-routes'
import type { Path } from '@echo/routing/types/path'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { SizeableImage } from '@echo/ui/components/base/sizeable-image'
import { SeiIconSvg } from '@echo/ui/components/base/svg/sei-icon-svg'
import { WalletButtonLayout } from '@echo/ui/components/wallet/layout/wallet-button-layout'
import { WalletChainManager } from '@echo/ui/components/wallet/wallet-chain-manager'
import { WalletStatusManager } from '@echo/ui/components/wallet/wallet-status-manager'
import { useAccount } from '@echo/ui/hooks/use-account'
import { useLoginStore } from '@echo/ui/hooks/use-login-store'
import type { Nullable } from '@echo/utils/types/nullable'
import { AccountStatus } from '@echo/web3-dom/constants/account-status'
import { shortenAddress } from '@echo/web3-dom/helpers/shorten-address'
import { clsx } from 'clsx'
import { usePathname } from 'next/navigation'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  user: Nullable<User>
}

const HeaderButtonProfilePicture: FunctionComponent<Props> = ({ user }) => {
  if (isNil(user)) {
    return null
  }

  const {
    discord: { avatarUrl, username }
  } = user
  return (
    <div className={clsx('w-12', 'h-12', 'rounded-lg', 'bg-dark-500', 'border', 'border-solid', 'border-white/[0.08]')}>
      <SizeableImage
        className={clsx('w-12', 'h-auto', 'rounded-lg', 'bg-dark-500', 'object-center', 'object-contain')}
        src={avatarUrl}
        alt={username}
        width={48}
        height={48}
        priority={true}
      />
    </div>
  )
}

const HeaderButtonWallet: FunctionComponent = () => {
  const { address, status } = useAccount()
  if (status === AccountStatus.Connected) {
    return (
      <div className={clsx('btn-auth', 'group-hover:bg-white/[0.12]')}>
        <SeiIconSvg width={24} />
        <span className={clsx('btn-label-auth')}>{shortenAddress(address)}</span>
      </div>
    )
  }
  return <WalletButtonLayout />
}

export const HeaderButton: FunctionComponent<Props> = ({ user }) => {
  const path = usePathname() as Path
  const { setCallbackPath } = useLoginStore.getState()
  console.log(`user ${JSON.stringify(user)}`)
  return (
    <InternalLink
      path={isNil(user) ? frontendRoutes.login.wallet.get() : frontendRoutes.user.profile.get()}
      onClick={() => {
        setCallbackPath(path)
      }}
    >
      <div className={clsx('flex', 'flex-row', 'gap-4', 'h-max', 'w-max', 'group')}>
        <HeaderButtonWallet />
        <HeaderButtonProfilePicture user={user} />
        <WalletChainManager />
        <WalletStatusManager user={user} />
      </div>
    </InternalLink>
  )
}
