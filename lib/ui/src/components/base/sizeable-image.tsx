'use client'
import { apiUrlProvider } from '@echo/api/routing/api-url-provider'
import { addPictureSize } from '@echo/ui/helpers/add-picture-size'
import { useDependencies } from '@echo/ui/providers/dependencies-provider'
import { removeQueryFromUrl } from '@echo/utils/helpers/remove-query-from-url'
import type { Nullable } from '@echo/utils/types/nullable'
import Image, { type ImageProps } from 'next/image'
import { isEmpty, partialRight } from 'ramda'
import type { FunctionComponent } from 'react'

// TODO update db instead
function convertIpfsScheme(src: string): string {
  if (isEmpty(src)) {
    return src
  }
  try {
    const urlObject = new URL(removeQueryFromUrl(src))
    if (urlObject.protocol == 'ipfs:') {
      return apiUrlProvider.ipfs.proxy.getUrl({ path: urlObject.pathname.slice(2) })
    }
    return src
  } catch (e) {
    return src
  }
}
export const SizeableImage: FunctionComponent<
  Omit<ImageProps, 'loader' | 'unoptimized' | 'src' | 'overrideSrc'> & Record<'src', Nullable<string>>
> = (props) => {
  const { logger } = useDependencies()
  const src = convertIpfsScheme(props.src ?? '')
  return <Image {...props} src={src} loader={partialRight(addPictureSize, [logger])} />
}
