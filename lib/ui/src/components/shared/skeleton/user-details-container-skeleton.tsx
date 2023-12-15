import { UserDiscordTagSkeleton } from '@echo/ui/components/shared/skeleton/user-discord-tag-skeleton'
import { UserProfilePictureSkeleton } from '@echo/ui/components/shared/skeleton/user-profile-picture-skeleton'
import { UserWalletSkeleton } from '@echo/ui/components/shared/skeleton/user-wallet-skeleton'
import { SIZE_MD } from '@echo/ui/constants/size'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export const UserDetailsContainerSkeleton: FunctionComponent = () => {
  return (
    <div className={clsx('flex', 'flex-row', 'gap-5', 'self-stretch', 'items-center')}>
      <UserProfilePictureSkeleton size={SIZE_MD} />
      <div className={clsx('flex', 'flex-col', 'gap-2.5', 'py-3')}>
        <UserDiscordTagSkeleton />
        <UserWalletSkeleton />
      </div>
    </div>
  )
}
