'use client'
import { PICTURE_SIZE_XL } from '@echo/ui/constants/picture-size'
import { addPictureSizeToUrl } from '@echo/ui/helpers/add-picture-size-to-url'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import Image from 'next/image'
import { type FunctionComponent } from 'react'

interface Props {
  alt: string
  src: Nullable<string>
}

export const CreateOfferExpirationImage: FunctionComponent<Props> = ({ alt, src }) => {
  return (
    <div className={clsx('rounded-2xl', 'w-[32rem]', 'h-[32rem]')}>
      <Image
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
        unoptimized={true}
        alt={alt}
        src={addPictureSizeToUrl(src, PICTURE_SIZE_XL)}
      />
    </div>
  )
}
