'use client'
import { ImagePlaceholder } from '@echo/ui/components/base/image-placeholder'
import { ImageSizeable } from '@echo/ui/components/base/image-sizeable'
import { useAuthUser } from '@echo/ui/hooks/use-auth-user'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import { type FunctionComponent, useState } from 'react'

export const HeaderButtonProfilePicture: FunctionComponent = () => {
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const { user } = useAuthUser()

  if (isNil(user) || error) {
    return null
  }

  const {
    discord: { avatarUrl, username }
  } = user
  return (
    <div
      className={clsx(
        'w-12',
        'h-12',
        'rounded-lg',
        'relative',
        'bg-dark-500',
        'border',
        'border-solid',
        'border-white/[0.08]'
      )}
    >
      <ImageSizeable
        className={clsx('rounded-lg', 'bg-dark-500', 'object-center', 'object-contain')}
        src={avatarUrl}
        alt={username}
        width={48}
        height={48}
        priority={true}
        onLoad={() => {
          setLoaded(true)
        }}
        onError={() => {
          setLoaded(true)
          setError(true)
        }}
      />
      <ImagePlaceholder className={clsx('rounded-lg')} show={!loaded} />
    </div>
  )
}
