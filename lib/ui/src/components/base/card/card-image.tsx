import { classes } from '@echo/ui/helpers/classes'
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
      className={classes(
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
      src={src}
    />
  )
}
