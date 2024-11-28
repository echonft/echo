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
    <div className={clsx('w-11.5', 'h-11.5', 'rounded-r-lg', 'relative', 'bg-dark-500')}>
      <ImageSizeable
        className={clsx('rounded-r-lg', 'bg-dark-500')}
        src={avatarUrl}
        alt={username}
        width={46}
        height={46}
        priority={true}
        onLoad={() => {
          setLoaded(true)
        }}
        onError={() => {
          setLoaded(true)
          setError(true)
        }}
      />
      {loaded ? (
        <div
          className={clsx(
            'absolute',
            'inset-0',
            'bg-white',
            'rounded-r-lg',
            'transition-opacity',
            'opacity-0',
            'group-hover:opacity-5'
          )}
        />
      ) : (
        <ImagePlaceholder className={clsx('rounded-lg')} show={true} />
      )}
    </div>
  )
}
