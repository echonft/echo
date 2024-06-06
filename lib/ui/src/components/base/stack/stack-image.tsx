import { SizeableImage } from '@echo/ui/components/base/sizeable-image'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  alt: string
  src: string
  scaleDisabled?: boolean
}

export const StackImage: FunctionComponent<Props> = ({ alt, src, scaleDisabled }) => {
  return (
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
      crossOrigin={'anonymous'}
      alt={alt}
      src={src}
    />
  )
}
