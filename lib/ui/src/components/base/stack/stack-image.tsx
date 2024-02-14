import { classes } from '@echo/ui/helpers/classes'
import Image from 'next/image'
import type { FunctionComponent } from 'react'

interface Props {
  alt: string
  src: string
  scaleDisabled?: boolean
}

export const StackImage: FunctionComponent<Props> = ({ alt, src, scaleDisabled }) => {
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
      width={202}
      height={202}
      alt={alt}
      src={src}
    />
  )
}
