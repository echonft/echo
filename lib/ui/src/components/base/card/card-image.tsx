'use client'
import { ImagePlaceholder } from '@echo/ui/components/base/image-placeholder'
import { PICTURE_SIZE_LG } from '@echo/ui/constants/picture-size'
import { addPictureSizeToUrl } from '@echo/ui/helpers/add-picture-size-to-url'
import { clsx } from 'clsx'
import Image from 'next/image'
import { type FunctionComponent, useState } from 'react'

interface Props {
  alt: string
  src: string
  scaleDisabled?: boolean
}

export const CardImage: FunctionComponent<Props> = ({ alt, src, scaleDisabled }) => {
  // TODO add error
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={clsx('rounded-2xl', 'w-[12.5rem]', 'h-[12.5rem]')}>
      <Image
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
        unoptimized={true}
        alt={alt}
        src={addPictureSizeToUrl(src, PICTURE_SIZE_LG)}
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
