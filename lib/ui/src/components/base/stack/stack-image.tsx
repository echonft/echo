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

export const StackImage: FunctionComponent<Props> = ({ alt, src }) => {
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  if (isNilOrEmpty(src) || error) {
    return <ImageNotFound width={202} height={202} className={clsx('rounded-2xl')} />
  }

  return (
    <div className={clsx('rounded-2xl', 'w-[12.5rem]', 'h-[12.5rem]', 'relative', 'bg-dark-500')}>
      <ImageSizeable
        className={clsx(
          'select-none',
          'rounded-2xl',
          'bg-dark-500',
          'transition-transform',
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
      {loaded ? (
        <div className={clsx('absolute', 'inset-0', 'rounded-2xl', 'bg-cardImageGradient', 'mix-blend-multiply')} />
      ) : (
        <ImagePlaceholder className={clsx('rounded-2xl')} show={true} />
      )}
    </div>
  )
}
