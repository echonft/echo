import { RedFlagIconSvg } from '../svg/red-flag-icon-svg'
import { IconContainer } from './icon-container'
import { getIconSizeInPx, IconSize } from './icon-size'
import { FunctionComponent } from 'react'

export interface RedFlagIconProps {
  size: IconSize
}

export const RedFlagIcon: FunctionComponent<RedFlagIconProps> = ({ size }) => {
  const width = Math.floor(getIconSizeInPx(size) * (13 / 24))
  const height = Math.floor(getIconSizeInPx(size) * (14 / 24))
  return (
    <IconContainer size={size}>
      <RedFlagIconSvg width={width} height={height} />
    </IconContainer>
  )
}
