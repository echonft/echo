'use client'
import { ImageNotFound } from '@echo/ui/components/base/image-not-found'
import { ImagePlaceholder } from '@echo/ui/components/base/image-placeholder'
import { ImageSizeable } from '@echo/ui/components/base/image-sizeable'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { type FunctionComponent, useState } from 'react'

interface Props {
  alt: string
  src: Nullable<string>
}

export const CardImage: FunctionComponent<Props> = ({ alt, src }) => {
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  if (isNilOrEmpty(src) || error) {
    return <ImageNotFound width={200} height={200} className={clsx('rounded-2xl')} />
  }

  return (
    <div className={clsx('rounded-2xl', 'w-[12.5rem]', 'h-[12.5rem]', 'relative', 'bg-dark-500')}>
      <ImageSizeable
        className={clsx(
          'select-none',
          'bg-dark-500',
          'rounded-2xl',
          'transition-transform',
          'w-auto',
          'h-auto',
          'object-center',
          'object-contain',
          'group-hover:scale-125'
        )}
        width={200}
        height={200}
        alt={alt}
        src={src}
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
