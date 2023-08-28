import { UserDiscordTagSkeleton } from '../user/user-discord-tag-skeleton'
import { UserProfilePictureSkeleton } from '../user/user-profile-picture-skeleton'
import { SizeMD } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export const OfferReceiverDetailsContainerSkeleton: FunctionComponent = () => (
  <div className={clsx('flex', 'flex-row', 'gap-5')}>
    <UserProfilePictureSkeleton size={SizeMD} />
    <div className={clsx('flex', 'flex-col', 'gap-2.5', 'py-3')}>
      <UserDiscordTagSkeleton />
      <div className={clsx('bg-white/[0.08]', 'rounded-lg', 'w-32', 'h-6', 'animate-pulse')} />
    </div>
  </div>
)
