'use client'
import { addPictureSize } from '@echo/ui/helpers/add-picture-size'
import { removeQueryFromUrl } from '@echo/utils/helpers/remove-query-from-url'
import type { Nullable } from '@echo/utils/types/nullable'
import Image, { type ImageProps } from 'next/image'
import { isEmpty } from 'ramda'
import type { FunctionComponent } from 'react'

// TODO update db instead
function convertIpfsScheme(src: string): string {
  if (isEmpty(src)) {
    return src
  }
  try {
    const urlObject = new URL(removeQueryFromUrl(src))
    if (urlObject.protocol == 'ipfs:') {
      return `https://pinata.echonft.xyz/ipfs/${urlObject.pathname.slice(2)}`
    }
    return src
  } catch (e) {
    return src
  }
}
export const SizeableImage: FunctionComponent<
  Omit<ImageProps, 'loader' | 'unoptimized' | 'src' | 'overrideSrc'> & Record<'src', Nullable<string>>
> = (props) => {
  const src = convertIpfsScheme(props.src ?? '')
  return <Image {...props} src={src} loader={addPictureSize} />
}
