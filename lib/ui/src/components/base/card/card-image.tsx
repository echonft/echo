import { PICTURE_SIZE_CARD } from '@echo/ui/constants/picture-size'
import { addPictureSizeToUrl } from '@echo/ui/helpers/add-picture-size-to-url'
import { clsx } from 'clsx'
import Image from 'next/image'
import type { FunctionComponent } from 'react'

interface Props {
  alt: string
  src: string
  scaleDisabled?: boolean
}

export const CardImage: FunctionComponent<Props> = ({ alt, src, scaleDisabled }) => {
  return (
    <Image
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
      width={200}
      height={200}
      alt={alt}
      src={addPictureSizeToUrl(src, PICTURE_SIZE_CARD)}
    />
  )
}
