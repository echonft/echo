'use client'
import { addPictureSize } from '@echo/ui/helpers/add-picture-size'
import Image, { type ImageProps } from 'next/image'
import { omit } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props extends Omit<ImageProps, 'loader' | 'overrideSrc' | 'src' | 'unoptimized' | 'width'> {
  src: string
  width: number
}

export const ImageSizeable: FunctionComponent<Props> = (props) => {
  const src = addPictureSize(props.src, props.width)
  return <Image {...omit(['src'], props)} src={src} unoptimized={true} />
}
