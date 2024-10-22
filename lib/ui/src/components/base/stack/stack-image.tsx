'use client'
import { ImagePlaceholder } from '@echo/ui/components/base/image-placeholder'
import { SizeableImage } from '@echo/ui/components/base/sizeable-image'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { type FunctionComponent, useState } from 'react'

interface Props {
  alt: string
  src: Nullable<string>
  scaleDisabled?: boolean
}

export const StackImage: FunctionComponent<Props> = ({ alt, src, scaleDisabled }) => {
  // TODO add error
  const [loaded, setLoaded] = useState(false)
  return (
    <div className={clsx('rounded-2xl', 'w-[12.625rem]', 'h-[12.625rem]', 'flex', 'justify-center', 'items-center')}>
      <SizeableImage
        className={clsx(
          'select-none',
          'rounded-2xl',
          'transition-transform',
          'w-full',
          'h-full',
          'object-center',
          'object-contain',
          !scaleDisabled && 'group-hover:scale-125'
        )}
        width={202}
        height={202}
        alt={alt}
        src={src}
        onLoad={() => {
          setLoaded(true)
        }}
        onError={() => {
          // TODO set an error state instead
          setLoaded(true)
        }}
      />
      <ImagePlaceholder show={!loaded} />
    </div>
  )
}
