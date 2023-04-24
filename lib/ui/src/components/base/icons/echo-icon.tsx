import { EchoIconColor, EchoIconSvg } from '../svg/echo-icon-svg'
import { IconContainer } from './icon-container'
import { getIconSizeInPx, IconSize } from './icon-size'
import { FunctionComponent } from 'react'

export interface EchoIconProps {
  color: EchoIconColor
  size: IconSize
}
export const EchoIcon: FunctionComponent<EchoIconProps> = ({ color, size }) => {
  const sizeInPx = Math.floor(getIconSizeInPx(size) * (13 / 24))
  return (
    <IconContainer size={size}>
      <EchoIconSvg width={sizeInPx} height={sizeInPx} color={color} />
    </IconContainer>
  )
}
