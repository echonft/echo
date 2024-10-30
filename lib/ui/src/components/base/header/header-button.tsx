'use client'
import type { User } from '@echo/model/types/user'
import { pathProvider } from '@echo/routing/constants/path-provider'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { SizeableImage } from '@echo/ui/components/base/sizeable-image'
import { Web3Provider } from '@echo/ui/components/providers/web3-provider'
import { ConnectWalletButton } from '@echo/ui/components/wallet/connect-wallet-button'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  user: Nullable<User>
}

const HeaderButtonImg: FunctionComponent<Props> = ({ user }) => {
  if (isNilOrEmpty(user)) {
    return null
  }
  const {
    discord: { avatarUrl, username }
  } = user
  return (
    <InternalLink path={pathProvider.profile.default.get()}>
      <div
        className={clsx('w-12', 'h-12', 'rounded-lg', 'bg-dark-500', 'border', 'border-solid', 'border-white/[0.08]')}
      >
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
    </InternalLink>
  )
}

export const HeaderButton: FunctionComponent<Props> = ({ user }) => {
  return (
    <div className={clsx('flex', 'flex-row', 'gap-4', 'h-max', 'w-max')}>
      <Web3Provider>
        <ConnectWalletButton user={user} />
      </Web3Provider>
      <HeaderButtonImg user={user} />
    </div>
  )
}
