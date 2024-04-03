import { linkProvider } from '@echo/api/routing/link-provider'
import type { HeaderLoggedInProps } from '@echo/ui/components/base/header/header-logged-in'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { SolanaConnectWalletButton } from '@echo/ui/components/solana-wallet/solana-connect-wallet-button'
import { ConnectWalletButton } from '@echo/ui/components/wallet/connect-wallet-button'
import { PICTURE_SIZE_SM } from '@echo/ui/constants/picture-size'
import { addPictureSizeToUrl } from '@echo/ui/helpers/add-picture-size-to-url'
import { clsx } from 'clsx'
import Image from 'next/image'
import { type FunctionComponent } from 'react'

export const HeaderProfileButton: FunctionComponent<HeaderLoggedInProps> = ({ user, onWalletButtonClick }) => {
  const {
    discord: { username, avatarUrl }
  } = user
  return (
    <div className={clsx('flex', 'flex-row', 'gap-4', 'h-max', 'w-max')}>
      <SolanaConnectWalletButton />
      <ConnectWalletButton onClick={onWalletButtonClick} />
      <InternalLink
        className={clsx('w-12', 'h-12', 'rounded-lg', 'bg-dark-500', 'border', 'border-solid', 'border-white/[0.08]')}
        path={linkProvider.profile.items.get()}
      >
        <Image
          className={clsx(
            'hover:opacity-80',
            'w-12',
            'h-auto',
            'rounded-lg',
            'bg-dark-500',
            'object-center',
            'object-contain'
          )}
          src={addPictureSizeToUrl(avatarUrl, PICTURE_SIZE_SM)}
          alt={username}
          width={48}
          height={48}
          priority={true}
          unoptimized={true}
        />
      </InternalLink>
    </div>
  )
}
