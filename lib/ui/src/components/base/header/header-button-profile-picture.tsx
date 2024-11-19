import { SizeableImage } from '@echo/ui/components/base/sizeable-image'
import { useAuthUser } from '@echo/ui/hooks/use-auth-user'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

export const HeaderButtonProfilePicture: FunctionComponent = () => {
  const { user } = useAuthUser()
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
