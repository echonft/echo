'use client'
import { SizeableImage } from '@echo/ui/components/base/sizeable-image'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  alt: string
  src: Nullable<string>
}

export const ExpirationImage: FunctionComponent<Props> = ({ alt, src }) => {
  return (
    <div className={clsx('rounded-2xl', 'w-[32rem]', 'h-[32rem]')}>
      <SizeableImage
        className={clsx(
          'select-none',
          'rounded-2xl',
          'transition-transform',
          'w-auto',
          'h-auto',
          'object-center',
          'object-contain'
        )}
        width={512}
        height={512}
        alt={alt}
        src={src}
      />
    </div>
  )
}
