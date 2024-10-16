import { pathProvider } from '@echo/routing/path-provider'
import type { HeaderLoggedInProps } from '@echo/ui/components/base/header/header-logged-in'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { SizeableImage } from '@echo/ui/components/base/sizeable-image'
import { ConnectWalletButton } from '@echo/ui/components/wallet/connect-wallet-button'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export const HeaderProfileButton: FunctionComponent<HeaderLoggedInProps> = ({ user, onWalletButtonClick }) => {
  const {
    discord: { username, avatarUrl }
  } = user
  return (
    <div className={clsx('flex', 'flex-row', 'gap-4', 'h-max', 'w-max')}>
      <ConnectWalletButton onClick={onWalletButtonClick} />
      <InternalLink
        className={clsx('w-12', 'h-12', 'rounded-lg', 'bg-dark-500', 'border', 'border-solid', 'border-white/[0.08]')}
        path={pathProvider.profile.default.get()}
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
      </InternalLink>
    </div>
  )
}
