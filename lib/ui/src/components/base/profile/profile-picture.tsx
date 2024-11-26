'use client'
import { ImageNotFound } from '@echo/ui/components/base/image-not-found'
import { ImagePlaceholder } from '@echo/ui/components/base/image-placeholder'
import { ImageSizeable } from '@echo/ui/components/base/image-sizeable'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { type FunctionComponent, useState } from 'react'

export interface ProfilePictureProps {
  pictureUrl: Nullable<string>
  alt: string
}

export const ProfilePicture: FunctionComponent<ProfilePictureProps> = ({ pictureUrl, alt }) => {
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  if (isNilOrEmpty(pictureUrl) || error) {
    return (
      <ImageNotFound
        height={112}
        width={122}
        className={clsx('border-solid', 'border-3', 'border-yellow-500', 'rounded-2xl')}
      />
    )
  }

  return (
    <div className={clsx('h-28', 'w-28', 'rounded-2xl')}>
      <ImageSizeable
        className={clsx(
          'select-none',
          'bg-dark-500',
          'object-contain',
          'border-solid',
          'border-3',
          'border-yellow-500',
          'h-28',
          'w-28',
          'rounded-2xl'
        )}
        src={pictureUrl}
        alt={alt}
        width={112}
        height={112}
        priority={true}
        onLoad={() => {
          setLoaded(true)
        }}
        onError={() => {
          setLoaded(true)
          setError(true)
        }}
      />
      <ImagePlaceholder show={!loaded} />
    </div>
  )
}
