'use client'
import { addPictureSize } from '@echo/ui/helpers/add-picture-size'
import { useDependencies } from '@echo/ui/components/base/dependencies-provider'
import type { Nullable } from '@echo/utils/types/nullable'
import Image, { type ImageProps } from 'next/image'
import { assoc, pipe } from 'ramda'
import type { FunctionComponent } from 'react'

export const SizeableImage: FunctionComponent<
  Omit<ImageProps, 'loader' | 'unoptimized' | 'src' | 'overrideSrc'> & Record<'src', Nullable<string>>
> = (props) => {
  const { logger } = useDependencies()
  const src = pipe(assoc('logger', logger), addPictureSize)(props)
  return <Image {...props} src={src} />
}
