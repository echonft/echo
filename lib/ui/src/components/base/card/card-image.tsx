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

export const CardImage: FunctionComponent<Props> = ({ alt, src, scaleDisabled }) => {
  // TODO add error
  const [loaded, setLoaded] = useState(false)
  return (
    <div className={clsx('rounded-2xl', 'w-[12.5rem]', 'h-[12.5rem]', 'flex', 'justify-center', 'items-center')}>
      <SizeableImage
        className={clsx(
          'select-none',
          'rounded-2xl',
          'transition-transform',
          'w-auto',
          'h-auto',
          'object-center',
          'object-contain',
          !scaleDisabled && 'group-hover:scale-125'
        )}
        width={200}
        height={200}
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
