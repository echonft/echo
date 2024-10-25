'use client'
import { addPictureSize } from '@echo/ui/helpers/add-picture-size'
import type { Nullable } from '@echo/utils/types/nullable'
import Image, { type ImageProps } from 'next/image'
import type { FunctionComponent } from 'react'

export const SizeableImage: FunctionComponent<
  Omit<ImageProps, 'loader' | 'unoptimized' | 'src' | 'overrideSrc'> &
    Record<'src', Nullable<string>> &
    Record<'width', number>
> = (props) => {
  const src = addPictureSize(props)
  return <Image {...props} src={src} />
}
