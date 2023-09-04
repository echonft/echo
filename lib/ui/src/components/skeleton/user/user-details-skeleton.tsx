import { BannerSkeleton } from '../base/banner-skeleton'
import { UserDiscordTagSkeleton } from './user-discord-tag-skeleton'
import { UserProfilePictureSkeleton } from './user-profile-picture-skeleton'
import { SizeLG } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export const UserDetailsSkeleton: FunctionComponent = () => {
  return (
    <div className={clsx('flex', 'flex-col', 'self-stretch', 'w-full')}>
      <BannerSkeleton />
      <div className={clsx('flex', 'flex-row', 'self-stretch', 'w-full', 'pt-40', 'gap-8', 'items-end')}>
        <UserProfilePictureSkeleton size={SizeLG} />
        <UserDiscordTagSkeleton />
      </div>
    </div>
  )
}
