import { isStorybook } from '@echo/ui/helpers/is-storybook'
import Image, { type ImageProps } from 'next/image'
import { identity, ifElse, is, prop } from 'ramda'
import { FunctionComponent } from 'react'

export const Img: FunctionComponent<Omit<ImageProps, 'src'> & { src: string | URL }> = (props) => {
  const { src, ...restProps } = props
  const srcString = ifElse(is(String), identity, prop('href'))(src) as string
  if (isStorybook()) {
    const { alt, height, width, className } = restProps
    return <img className={className} src={srcString} alt={alt} width={width} height={height} />
  }

  return <Image src={srcString} {...restProps} />
}
