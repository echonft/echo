import { TwitterIconSvg } from '../svg/twitter-icon-svg'
import { IconContainer } from './icon-container'
import { getIconSizeInPx, IconSize } from './icon-size'
import { FunctionComponent } from 'react'

export interface TwitterIconProps {
  size: IconSize
}

export const TwitterIcon: FunctionComponent<TwitterIconProps> = ({ size }) => {
  const width = Math.floor(getIconSizeInPx(size) * (21 / 30))
  const height = Math.floor(getIconSizeInPx(size) * (18 / 30))
  return (
    <IconContainer size={size}>
      <TwitterIconSvg width={width} height={height} />
    </IconContainer>
  )
}
