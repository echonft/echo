'use client'
import { ImageNotFound } from '@echo/ui/components/base/image-not-found'
import { ImagePlaceholder } from '@echo/ui/components/base/image-placeholder'
import { ImageSizeable } from '@echo/ui/components/base/image-sizeable'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import type { Nullable } from '@echo/utils/types/nullable'
import clsx from 'clsx'
import { type FunctionComponent, useState } from 'react'

interface Props {
  src: Nullable<string>
  alt: string
}

export const TradeCardPicture: FunctionComponent<Props> = ({ src, alt }) => {
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  if (isNilOrEmpty(src) || error) {
    return <ImageNotFound width={88} height={88} className={clsx('rounded-2xl')} />
  }

  return (
    <div className={clsx('w-[5.5rem]', 'h-[5.5rem]', 'relative', 'rounded-2xl')}>
      <ImageSizeable
        className={clsx('select-none', 'rounded-2xl', 'object-center', 'object-contain')}
        width={88}
        height={88}
        src={src}
        alt={alt}
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
          className={clsx('absolute', 'inset-0', 'bg-gradient-to-b', 'from-transparent', 'to-black', 'rounded-2xl')}
        />
      ) : (
        <ImagePlaceholder className={clsx('rounded-2xl')} show={true} />
      )}
    </div>
  )
}
