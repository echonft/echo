import { IconContainer } from './icon-container'
import { getIconSizeInPx, IconSize } from './icon-size'
import { FunctionComponent } from 'react'

export interface BlurIconProps {
  size: IconSize
}

export const BlurIcon: FunctionComponent<BlurIconProps> = ({ size }) => {
  const sizeInPx = Math.floor(getIconSizeInPx(size) * 0.85)
  return (
    <IconContainer size={size}>
      <img
        src={'https://firebasestorage.googleapis.com/v0/b/echo-83309.appspot.com/o/blur-logo.png?alt=media'}
        width={sizeInPx}
        height={sizeInPx}
        alt={'blur'}
      />
    </IconContainer>
  )
}
