'use client'
import type { User } from '@echo/model/types/user'
import { pathProvider } from '@echo/routing/constants/path-provider'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { SizeableImage } from '@echo/ui/components/base/sizeable-image'
import { Web3Provider } from '@echo/ui/components/base/web3-provider'
import { ConnectWalletButton } from '@echo/ui/components/wallet/connect-wallet-button'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  user: Nullable<User>
}

const HeaderButtonLayout: FunctionComponent<PropsWithChildren<Props>> = ({ user, children }) => {
  if (isNil(user)) {
    return <>{children}</>
  }
  return <InternalLink path={pathProvider.profile.default.get()}>{children}</InternalLink>
}

const HeaderButtonImg: FunctionComponent<Props> = ({ user }) => {
  if (isNil(user)) {
    return null
  }
  const {
    discord: { avatarUrl, username }
  } = user
  return (
    <div className={clsx('w-12', 'h-12', 'rounded-lg', 'bg-dark-500', 'border', 'border-solid', 'border-white/[0.08]')}>
      <SizeableImage
        className={clsx(
          'hover:opacity-80',
          'w-12',
          'h-auto',
          'rounded-lg',
          'bg-dark-500',
          'object-center',
          'object-contain'
        )}
        src={avatarUrl}
        alt={username}
        width={48}
        height={48}
        priority={true}
      />
    </div>
  )
}

export const HeaderButton: FunctionComponent<Props> = ({ user }) => {
  return (
    <HeaderButtonLayout user={user}>
      <div className={clsx('flex', 'flex-row', 'gap-4', 'h-max', 'w-max')}>
        <Web3Provider>
          <ConnectWalletButton user={user} />
        </Web3Provider>
        <HeaderButtonImg user={user} />
      </div>
    </HeaderButtonLayout>
  )
}
