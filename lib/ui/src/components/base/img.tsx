import { isStorybook } from '@echo/ui/helpers/is-storybook'
import Image, { type ImageProps } from 'next/image'
import { FunctionComponent } from 'react'

export const Img: FunctionComponent<Omit<ImageProps, 'src'> & Record<'src', string>> = (props) => {
  const { src, ...restProps } = props
  if (isStorybook()) {
    const { alt, height, width, className } = restProps
    return <img className={className} src={src} alt={alt} width={width} height={height} />
  }

  return <Image src={src} {...restProps} />
}
