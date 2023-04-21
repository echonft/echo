import { OpenSeaIconSvg } from '../svg/open-sea-icon-svg'
import { IconContainer } from './icon-container'
import { getIconSizeInPx, IconSize } from './icon-size'
import { FunctionComponent } from 'react'

export interface OpenSeaIconProps {
  size: IconSize
}

export const OpenSeaIcon: FunctionComponent<OpenSeaIconProps> = ({ size }) => {
  const sizeInPx = Math.floor(getIconSizeInPx(size) * (18 / 30))
  return (
    <IconContainer size={size}>
      <OpenSeaIconSvg width={sizeInPx} height={sizeInPx} />
    </IconContainer>
  )
}
