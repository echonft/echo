import { UserProfilePictureSkeleton } from '../user/user-profile-picture-skeleton'
import { UserDiscordTagSkeleton } from './user-discord-tag-skeleton'
import { UserWalletSkeleton } from './user-wallet-skeleton'
import { SizeMD } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export const UserDetailsContainerSkeleton: FunctionComponent = () => {
  return (
    <div className={clsx('flex', 'flex-row', 'gap-5', 'self-stretch', 'items-center')}>
      <UserProfilePictureSkeleton size={SizeMD} />
      <div className={clsx('flex', 'flex-col', 'gap-2.5', 'py-3')}>
        <UserDiscordTagSkeleton />
        <UserWalletSkeleton />
      </div>
    </div>
  )
}
