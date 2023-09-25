import { isStorybook } from '@echo/ui/helpers/is-storybook'
import Image, { type ImageProps } from 'next/image'
import { FunctionComponent } from 'react'

export const Img: FunctionComponent<ImageProps & { src: string }> = (props) => {
  if (isStorybook()) {
    const { src, alt, height, width, className } = props
    return <img className={className} src={src} alt={alt} width={width} height={height} />
  }

  return <Image {...props} />
}
